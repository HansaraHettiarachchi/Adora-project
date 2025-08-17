import type { Response } from '../types/EntityType.js';
import { ProductService } from '../service/ProductService.js';

const productService = new ProductService();

export class ProductController {
 
    async setCategory(req: any, res: any) {
        const { name } = req.body;
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ status: 400, message: 'Invalid category name', data: { name: 'Category name is required' } });
        }
        const result: Response = await productService.setCategory(name.trim());
        return res.status(result.status).json(result);
    }

    async getAllCategory(req: any, res: any) {
        const result: Response = await productService.getAllCategory();
        return res.status(result.status).json(result);
    }

    async getCategoryById(req: any, res: any) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid category ID', data: { id: 'Category ID is required' } });
        }
        const result: Response = await productService.getCategoryById(id);
        return res.status(result.status).json(result);
    }

    async deleteCategory(req: any, res: any) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid category ID', data: { id: 'Category ID is required' } });
        }
        const result: Response = await productService.deleteCategory(id);
        return res.status(result.status).json(result);
    }

    // MotherPlantType endpoints
    async setMotherPlantType(req: any, res: any) {
        const { name } = req.body;
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ status: 400, message: 'Invalid mother plant type name', data: { name: 'Mother plant type name is required' } });
        }
        const result: Response = await productService.setMotherPlantType(name.trim());
        return res.status(result.status).json(result);
    }

    async getAllMotherPlantType(req: any, res: any) {
        const result: Response = await productService.getAllMotherPlantType();
        return res.status(result.status).json(result);
    }

    async getMotherPlantTypeById(req: any, res: any) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid mother plant type ID', data: { id: 'Mother plant type ID is required' } });
        }
        const result: Response = await productService.getMotherPlantTypeById(id);
        return res.status(result.status).json(result);
    }

    async deleteMotherPlantType(req: any, res: any) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid mother plant type ID', data: { id: 'Mother plant type ID is required' } });
        }
        const result: Response = await productService.deleteMotherPlantType(id);
        return res.status(result.status).json(result);
    }

    // Size endpoints
    async setSize(req: any, res: any) {
        const { size, short_key } = req.body;
        if (!size || typeof size !== 'string' || size.trim() === '') {
            return res.status(400).json({ status: 400, message: 'Invalid size', data: { size: 'Size is required' } });
        }
        if (!short_key || typeof short_key !== 'string' || short_key.trim() === '') {
            return res.status(400).json({ status: 400, message: 'Invalid short key', data: { short_key: 'Short key is required' } });
        }
        const result: Response = await productService.setSize(size.trim(), short_key.trim());
        return res.status(result.status).json(result);
    }

    async getAllSize(req: any, res: any) {
        const result: Response = await productService.getAllSize();
        return res.status(result.status).json(result);
    }

    async getSizeById(req: any, res: any) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid size ID', data: { id: 'Size ID is required' } });
        }
        const result: Response = await productService.getSizeById(id);
        return res.status(result.status).json(result);
    }

    async deleteSize(req: any, res: any) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid size ID', data: { id: 'Size ID is required' } });
        }
        const result: Response = await productService.deleteSize(id);
        return res.status(result.status).json(result);
    }
}
