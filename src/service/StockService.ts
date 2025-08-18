import { PrismaClient } from '../generated/prisma/index.js';
import type { Response } from '../types/EntityType.js';
import type { Stock } from '../types/EntityType.js';
import path from 'path';
import { FileUploader } from '../util/FileUploader.js';

const prisma = new PrismaClient();

export class StockService {
    async deleteBatchImages(batch_id: number): Promise<void> {
        const images = await prisma.product_images.findMany({ where: { batch_id } });
        for (const img of images) {
            // img.name contains the url path, extract filename
            const filename = img.name.replace('/static/', '');
            await FileUploader.deleteFile(filename);
        }
    }

    // Helper to generate a unique batch code
    private async generateUniqueCode(baseCode: string): Promise<string> {
        let code = baseCode;
        let exists = true;
        let attempt = 0;
        while (exists) {
            exists = await prisma.batch.findFirst({ where: { code } }) !== null;
            if (exists) {
                attempt++;
                code = `${baseCode}_${attempt}`;
            }
        }
        return code;
    }

    async setStock(data: Stock, imageFiles: Express.Multer.File[] | null): Promise<Response> {
        let batch;
        if (!data.id || data.id === 0) {
            // Create new batch with unique code
            if (typeof data.size_id !== 'number' || !data.code) {
                return {
                    status: 400,
                    message: 'size_id and code are required to create a batch',
                    data: null
                };
            }
            const uniqueCode = await this.generateUniqueCode(data.code);
            batch = await prisma.batch.create({
                data: {
                    product_id: data.product_id,
                    qty: data.qty,
                    cost: data.cost ?? 0,
                    price: data.price ?? 0,
                    size_id: data.size_id,
                    code: uniqueCode,
                    desc: ''
                }
            });
        } else {
            // Only update existing batch, never create new
            batch = await prisma.batch.findUnique({ where: { id: data.id } });
            if (!batch) {
                return {
                    status: 404,
                    message: 'Batch not found',
                    data: null
                };
            }
            batch = await prisma.batch.update({
                where: { id: data.id },
                data: { qty: { increment: data.qty } }
            });
        }

        // If images are uploading, delete existing images first (override)
        if (imageFiles && imageFiles.length > 0) {
            await this.deleteBatchImages(batch.id);
            await prisma.product_images.deleteMany({ where: { batch_id: batch.id } });
            for (const file of imageFiles) {
                const imageName = `${Date.now()}_${file.originalname}`;
                const imageUrl = await FileUploader.uploadFile(
                    file,
                    path.join('batch', String(batch.id), imageName)
                );
                await prisma.product_images.create({
                    data: {
                        batch_id: batch.id,
                        name: path.join('batch', String(batch.id), imageName).replace(/\\/g, '/')
                    }
                });
            }
        }

        return {
            status: 201,
            message: 'Stock processed successfully',
            data: batch
        };
    }

    async deleteBatch(batch_id: number): Promise<Response> {
        // Check for foreign key constraints (e.g., sales, orders)
        // Example: check for foreign key issues in invoice_items table
        const related = await prisma.invoice_items.findFirst({ where: { batch_id } });
        if (related) {
            return {
                status: 409,
                message: 'Cannot delete batch: related order items exist',
                data: null
            };
        }
        await this.deleteBatchImages(batch_id);
        await prisma.product_images.deleteMany({ where: { batch_id } });
        await prisma.batch.delete({ where: { id: batch_id } });
        return {
            status: 200,
            message: 'Batch deleted successfully',
            data: null
        };
    }
}
