import type { Product, Response } from '../types/EntityType.js';
import { ProductService } from '../service/ProductService.js';

const productService = new ProductService();

export class ProductController {
    // Product endpoints
    async createProduct(req: any, res: any) {
        const product: Product = req.body;
        // Input validation
        if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
            return res.status(400).json({ status: 400, message: 'Invalid product name', data: { name: 'Product name is required' } });
        }
        if (!product.mother_plant_type_id || isNaN(Number(product.mother_plant_type_id)) || Number(product.mother_plant_type_id) <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid mother plant type ID', data: { mother_plant_type_id: 'Mother plant type ID is required' } });
        }
        if (!product.category_id || isNaN(Number(product.category_id)) || Number(product.category_id) <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid category ID', data: { category_id: 'Category ID is required' } });
        }
        // Set default values if not provided
        product.name = product.name.trim();
        product.desc = product.desc ?? null;
        product.isActive = product.isActive ?? true;
        product.id = 0; // id will be set by DB
        const result: Response = await productService.createProduct(product);
        return res.status(result.status).json(result);
    }

    async getAllProducts(req: any, res: any) {
        const result: Response = await productService.getAllProducts();
        return res.status(result.status).json(result);
    }

    async getProductById(req: any, res: any) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid product ID', data: { id: 'Product ID is required' } });
        }
        const result: Response = await productService.getProductById(id);
        return res.status(result.status).json(result);
    }

    async deleteProduct(req: any, res: any) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid product ID', data: { id: 'Product ID is required' } });
        }
        const result: Response = await productService.deleteProduct(id);
        return res.status(result.status).json(result);
    }

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
