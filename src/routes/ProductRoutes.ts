/**
 * @route POST /create-product
 * @description Create a new product. Body: Product object
 * @body Example:
 * {
 *   "name": "Product Name",
 *   "desc": "Description",
 *   "mother_plant_type_id": 1,
 *   "category_id": 2,
 *   "isActive": true
 * }
 */

import { Router } from 'express';
import { ProductController } from '../controller/ProductController.js';

const productRoutes = Router();
// ...existing code...

/**
 * @route POST /create-product
 * @description Create a new product. Body: { name, desc, mother_plant_type_id, category_id, isActive }
 */
productRoutes.post('/create-product', async (req, res) => {
	try {
		await controller.createProduct(req, res);
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route GET /get-all-products
 * @description Get all products.
 */
productRoutes.get('/get-all-products', async (req, res) => {
	try {
		await controller.getAllProducts(req, res);
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route GET /get-product-by-id/:id
 * @description Get product by ID.
 */
productRoutes.get('/get-product-by-id/:id', async (req, res) => {
	try {
		await controller.getProductById(req, res);
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route DELETE /delete-product/:id
 * @description Delete product by ID.
 */
productRoutes.delete('/delete-product/:id', async (req, res) => {
	try {
		await controller.deleteProduct(req, res);
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});
const controller = new ProductController();

/**
 * @route POST /set-category
 * @description Create a new category. Body: { name: string }
 */
productRoutes.post('/set-category', async (req, res) => {
	try {
		await controller.setCategory(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route GET /get-all-category
 * @description Get all categories.
 */
productRoutes.get('/get-all-category', async (req, res) => {
	try {
		await controller.getAllCategory(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route GET /get-category-by-id/:id
 * @description Get category by ID.
 */
productRoutes.get('/get-category-by-id/:id', async (req, res) => {
	try {
		await controller.getCategoryById(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route DELETE /delete-category/:id
 * @description Delete category by ID (if no foreign key constraints).
 */
productRoutes.delete('/delete-category/:id', async (req, res) => {
	try {
		await controller.deleteCategory(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route POST /set-mother-plant-type
 * @description Create a new mother plant type. Body: { name: string }
 */
productRoutes.post('/set-mother-plant-type', async (req, res) => {
	try {
		await controller.setMotherPlantType(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route GET /get-all-mother-plant-type
 * @description Get all mother plant types.
 */
productRoutes.get('/get-all-mother-plant-type', async (req, res) => {
	try {
		await controller.getAllMotherPlantType(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route GET /get-mother-plant-type-by-id/:id
 * @description Get mother plant type by ID.
 */
productRoutes.get('/get-mother-plant-type-by-id/:id', async (req, res) => {
	try {
		await controller.getMotherPlantTypeById(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route DELETE /delete-mother-plant-type/:id
 * @description Delete mother plant type by ID (if no foreign key constraints).
 */
productRoutes.delete('/delete-mother-plant-type/:id', async (req, res) => {
	try {
		await controller.deleteMotherPlantType(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route POST /set-size
 * @description Create a new size. Body: { size: string, short_key: string }
 */
productRoutes.post('/set-size', async (req, res) => {
	try {
		await controller.setSize(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route GET /get-all-size
 * @description Get all sizes.
 */
productRoutes.get('/get-all-size', async (req, res) => {
	try {
		await controller.getAllSize(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route GET /get-size-by-id/:id
 * @description Get size by ID.
 */
productRoutes.get('/get-size-by-id/:id', async (req, res) => {
	try {
		await controller.getSizeById(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route DELETE /delete-size/:id
 * @description Delete size by ID (if no foreign key constraints).
 */
productRoutes.delete('/delete-size/:id', async (req, res) => {
	try {
		await controller.deleteSize(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

export default productRoutes;
