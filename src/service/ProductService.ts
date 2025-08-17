import type { Category, Response } from '../types/EntityType.js';
import type { CategoryErr } from '../types/ErrorType.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductService {
    // Product endpoints
    async createProduct(product: import('../types/EntityType.js').ProductCreate): Promise<Response> {
        // Database validation: check for duplicate product name with same mother_plant_type_id and category_id
        const existing = await prisma.product.findFirst({
            where: {
                name: product.name,
                mother_plant_type_id: product.mother_plant_type_id,
                category_id: product.category_id
            }
        });
        if (existing) {
            return {
                status: 409,
                message: 'Product already exists with same name, mother plant type, and category',
                data: null
            };
        }
        const newProduct = await prisma.product.create({
            data: {
                name: product.name,
                desc: product.desc ?? null,
                mother_plant_type_id: product.mother_plant_type_id,
                category_id: product.category_id,
                isActive: product.isActive ?? true
            }
        });
        // Ensure returned data matches Product type
        const productData: import('../types/EntityType.js').Product = {
            id: newProduct.id,
            name: newProduct.name,
            desc: newProduct.desc,
            mother_plant_type_id: newProduct.mother_plant_type_id,
            category_id: newProduct.category_id,
            isActive: newProduct.isActive
        };
        return {
            status: 201,
            message: 'Product created successfully',
            data: productData
        };
    }

    async getAllProducts(): Promise<Response> {
        const products = await prisma.product.findMany();
        // Ensure all returned items match Product type
        const productList: import('../types/EntityType.js').Product[] = products.map((p: any) => ({
            id: p.id,
            name: p.name,
            desc: p.desc,
            mother_plant_type_id: p.mother_plant_type_id,
            category_id: p.category_id,
            isActive: p.isActive
        }));
        return {
            status: 200,
            message: 'Products fetched successfully',
            data: productList
        };
    }

    async getProductById(id: number): Promise<Response> {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            return {
                status: 404,
                message: 'Product not found',
                data: null
            };
        }
        const productData: import('../types/EntityType.js').Product = {
            id: product.id,
            name: product.name,
            desc: product.desc,
            mother_plant_type_id: product.mother_plant_type_id,
            category_id: product.category_id,
            isActive: product.isActive
        };
        return {
            status: 200,
            message: 'Product fetched successfully',
            data: productData
        };
    }

    async deleteProduct(id: number): Promise<Response> {
        try {
            await prisma.product.delete({ where: { id } });
            return {
                status: 200,
                message: 'Product deleted successfully',
                data: null
            };
        } catch (error: any) {
            if (error.code === 'P2003') {
                return {
                    status: 409,
                    message: 'Cannot delete product due to foreign key constraint',
                    data: null
                };
            }
            return {
                status: 500,
                message: 'Internal server error',
                data: error.message
            };
        }
    }

    async setCategory(name: string): Promise<Response> {
        // Check if category already exists
        const existing = await prisma.category.findUnique({ where: { name } });
        if (existing) {
            return { status: 409, message: 'Category already exists', data: { name: 'Category already exists' } };
        }
        const category = await prisma.category.create({ data: { name } });
        return { status: 201, message: 'Category created successfully', data: category };
    }

    async getAllCategory(): Promise<Response> {
        const categories = await prisma.category.findMany();
        return { status: 200, message: 'Categories fetched successfully', data: categories };
    }

    async getCategoryById(id: number): Promise<Response> {
        const category = await prisma.category.findUnique({ where: { id } });
        if (!category) {
            return { status: 404, message: 'Category not found', data: null };
        }
        return { status: 200, message: 'Category fetched successfully', data: category };
    }

    async deleteCategory(id: number): Promise<Response> {
        try {
            await prisma.category.delete({ where: { id } });
            return { status: 200, message: 'Category deleted successfully', data: null };
        } catch (error: any) {
            if (error.code === 'P2003') { // Prisma foreign key constraint error
                return { status: 409, message: 'Cannot delete category due to foreign key constraint', data: null };
            }
            return { status: 500, message: 'Internal server error', data: error.message };
        }
    }

    // MotherPlantType endpoints
    async setMotherPlantType(name: string): Promise<Response> {
        const existing = await prisma.mother_plant_type.findUnique({ where: { name } });
        if (existing) {
            return { status: 409, message: 'Mother plant type already exists', data: { name: 'Mother plant type already exists' } };
        }
        const motherPlantType = await prisma.mother_plant_type.create({ data: { name } });
        return { status: 201, message: 'Mother plant type created successfully', data: motherPlantType };
    }

    async getAllMotherPlantType(): Promise<Response> {
        const types = await prisma.mother_plant_type.findMany();
        return { status: 200, message: 'Mother plant types fetched successfully', data: types };
    }

    async getMotherPlantTypeById(id: number): Promise<Response> {
        const type = await prisma.mother_plant_type.findUnique({ where: { id } });
        if (!type) {
            return { status: 404, message: 'Mother plant type not found', data: null };
        }
        return { status: 200, message: 'Mother plant type fetched successfully', data: type };
    }

    async deleteMotherPlantType(id: number): Promise<Response> {
        try {
            await prisma.mother_plant_type.delete({ where: { id } });
            return { status: 200, message: 'Mother plant type deleted successfully', data: null };
        } catch (error: any) {
            if (error.code === 'P2003') {
                return { status: 409, message: 'Cannot delete mother plant type due to foreign key constraint', data: null };
            }
            return { status: 500, message: 'Internal server error', data: error.message };
        }
    }

    // Size endpoints
    async setSize(size: string, short_key: string): Promise<Response> {
        const existing = await prisma.size.findFirst({ where: { size, short_key } });
        if (existing) {
            return { status: 409, message: 'Size already exists', data: { size: 'Size already exists', short_key: 'Size already exists' } };
        }
        const newSize = await prisma.size.create({ data: { size, short_key } });
        return { status: 201, message: 'Size created successfully', data: newSize };
    }

    async getAllSize(): Promise<Response> {
        const sizes = await prisma.size.findMany();
        return { status: 200, message: 'Sizes fetched successfully', data: sizes };
    }

    async getSizeById(id: number): Promise<Response> {
        const size = await prisma.size.findUnique({ where: { id } });
        if (!size) {
            return { status: 404, message: 'Size not found', data: null };
        }
        return { status: 200, message: 'Size fetched successfully', data: size };
    }

    async deleteSize(id: number): Promise<Response> {
        try {
            await prisma.size.delete({ where: { id } });
            return { status: 200, message: 'Size deleted successfully', data: null };
        } catch (error: any) {
            if (error.code === 'P2003') {
                return { status: 409, message: 'Cannot delete size due to foreign key constraint', data: null };
            }
            return { status: 500, message: 'Internal server error', data: error.message };
        }
    }
}