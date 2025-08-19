import { ProductService } from '../service/ProductService.js';
const productService = new ProductService();
export class ProductController {
    // Product endpoints
    async createProduct(req, res) {
        const product = req.body;
        const errors = {};
        if (!product.name || typeof product.name !== 'string' || product.name.trim() === '') {
            errors.name = 'Product name is required';
        }
        if (!product.mother_plant_type_id || isNaN(Number(product.mother_plant_type_id)) || Number(product.mother_plant_type_id) <= 0) {
            errors.mother_plant_type_id = 'Mother plant type ID is required';
        }
        if (!product.category_id || isNaN(Number(product.category_id)) || Number(product.category_id) <= 0) {
            errors.category_id = 'Category ID is required';
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                status: 400,
                message: 'Validation error',
                data: errors
            });
        }
        // Set default values if not provided
        product.name = product.name.trim();
        product.desc = product.desc ?? null;
        product.isActive = product.isActive ?? true;
        product.id = 0; // id will be set by DB
        const result = await productService.createProduct(product);
        return res.status(result.status).json(result);
    }
    async getAllProducts(req, res) {
        const result = await productService.getAllProducts();
        return res.status(result.status).json(result);
    }
    async getPaginatedProducts(req, res) {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        const result = await productService.getPaginatedProducts(page, pageSize);
        return res.status(result.status).json(result);
    }
    async getProductById(req, res) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid product ID', data: { id: 'Product ID is required' } });
        }
        const result = await productService.getProductById(id);
        return res.status(result.status).json(result);
    }
    async getProductDetailById(req, res) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid product ID', data: { id: 'Product ID is required' } });
        }
        try {
            const result = await productService.getProductDetailById(id);
            if (result.status === 404) {
                return res.status(404).json({ status: 404, message: 'Product not found', data: null });
            }
            return res.status(200).json(result.data);
        }
        catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
        }
    }
    async deleteProduct(req, res) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid product ID', data: { id: 'Product ID is required' } });
        }
        const result = await productService.deleteProduct(id);
        return res.status(result.status).json(result);
    }
    async setCategory(req, res) {
        const { name } = req.body;
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ status: 400, message: 'Invalid category name', data: { name: 'Category name is required' } });
        }
        const result = await productService.setCategory(name.trim());
        return res.status(result.status).json(result);
    }
    async getAllCategory(req, res) {
        const result = await productService.getAllCategory();
        return res.status(result.status).json(result);
    }
    async getCategoryById(req, res) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid category ID', data: { id: 'Category ID is required' } });
        }
        const result = await productService.getCategoryById(id);
        return res.status(result.status).json(result);
    }
    async deleteCategory(req, res) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid category ID', data: { id: 'Category ID is required' } });
        }
        const result = await productService.deleteCategory(id);
        return res.status(result.status).json(result);
    }
    // MotherPlantType endpoints
    async setMotherPlantType(req, res) {
        const { name } = req.body;
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ status: 400, message: 'Invalid mother plant type name', data: { name: 'Mother plant type name is required' } });
        }
        const result = await productService.setMotherPlantType(name.trim());
        return res.status(result.status).json(result);
    }
    async getAllMotherPlantType(req, res) {
        const result = await productService.getAllMotherPlantType();
        return res.status(result.status).json(result);
    }
    async getMotherPlantTypeById(req, res) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid mother plant type ID', data: { id: 'Mother plant type ID is required' } });
        }
        const result = await productService.getMotherPlantTypeById(id);
        return res.status(result.status).json(result);
    }
    async deleteMotherPlantType(req, res) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid mother plant type ID', data: { id: 'Mother plant type ID is required' } });
        }
        const result = await productService.deleteMotherPlantType(id);
        return res.status(result.status).json(result);
    }
    // Size endpoints
    async setSize(req, res) {
        const { size, short_key } = req.body;
        if (!size || typeof size !== 'string' || size.trim() === '') {
            return res.status(400).json({ status: 400, message: 'Invalid size', data: { size: 'Size is required' } });
        }
        if (!short_key || typeof short_key !== 'string' || short_key.trim() === '') {
            return res.status(400).json({ status: 400, message: 'Invalid short key', data: { short_key: 'Short key is required' } });
        }
        const result = await productService.setSize(size.trim(), short_key.trim());
        return res.status(result.status).json(result);
    }
    async getAllSize(req, res) {
        const result = await productService.getAllSize();
        return res.status(result.status).json(result);
    }
    async getSizeById(req, res) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid size ID', data: { id: 'Size ID is required' } });
        }
        const result = await productService.getSizeById(id);
        return res.status(result.status).json(result);
    }
    async deleteSize(req, res) {
        const id = Number(req.params.id);
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 400, message: 'Invalid size ID', data: { id: 'Size ID is required' } });
        }
        const result = await productService.deleteSize(id);
        return res.status(result.status).json(result);
    }
}
//# sourceMappingURL=ProductController.js.map