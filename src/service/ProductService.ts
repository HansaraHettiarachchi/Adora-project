import type { Category, Response } from '../types/EntityType.js';
import type { CategoryErr } from '../types/ErrorType.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductService {

    async setCategory(name: string): Promise<Response> {
        if (!name || name.trim() === '') {
            return { status: 400, message: 'Category name is required', data: { name: 'Category name is required' } };
        }
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
        if (!id) {
            return { status: 400, message: 'Category ID is required', data: { id: 'Category ID is required' } };
        }
        const category = await prisma.category.findUnique({ where: { id } });
        if (!category) {
            return { status: 404, message: 'Category not found', data: null };
        }
        return { status: 200, message: 'Category fetched successfully', data: category };
    }

    async deleteCategory(id: number): Promise<Response> {
        if (!id) {
            return { status: 400, message: 'Category ID is required', data: { id: 'Category ID is required' } };
        }
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
        if (!name || name.trim() === '') {
            return { status: 400, message: 'Mother plant type name is required', data: { name: 'Mother plant type name is required' } };
        }
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
        if (!id) {
            return { status: 400, message: 'Mother plant type ID is required', data: { id: 'Mother plant type ID is required' } };
        }
        const type = await prisma.mother_plant_type.findUnique({ where: { id } });
        if (!type) {
            return { status: 404, message: 'Mother plant type not found', data: null };
        }
        return { status: 200, message: 'Mother plant type fetched successfully', data: type };
    }

    async deleteMotherPlantType(id: number): Promise<Response> {
        if (!id) {
            return { status: 400, message: 'Mother plant type ID is required', data: { id: 'Mother plant type ID is required' } };
        }
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
        if (!size || size.trim() === '') {
            return { status: 400, message: 'Size is required', data: { size: 'Size is required' } };
        }
        if (!short_key || short_key.trim() === '') {
            return { status: 400, message: 'Short key is required', data: { short_key: 'Short key is required' } };
        }
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
        if (!id) {
            return { status: 400, message: 'Size ID is required', data: { id: 'Size ID is required' } };
        }
        const size = await prisma.size.findUnique({ where: { id } });
        if (!size) {
            return { status: 404, message: 'Size not found', data: null };
        }
        return { status: 200, message: 'Size fetched successfully', data: size };
    }

    async deleteSize(id: number): Promise<Response> {
        if (!id) {
            return { status: 400, message: 'Size ID is required', data: { id: 'Size ID is required' } };
        }
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