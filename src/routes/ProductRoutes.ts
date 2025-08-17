
import { Router } from 'express';
import { ProductController } from '../controller/ProductController.js';

const productRoutes = Router();
const controller = new ProductController();

/**
 * @route POST /set-category
 * @description Create a new category. Body: { name: string }
 */
productRoutes.post('/set-category', (req, res) => controller.setCategory(req, res));

/**
 * @route GET /get-all-category
 * @description Get all categories.
 */
productRoutes.get('/get-all-category', (req, res) => controller.getAllCategory(req, res));

/**
 * @route GET /get-category-by-id/:id
 * @description Get category by ID.
 */
productRoutes.get('/get-category-by-id/:id', (req, res) => controller.getCategoryById(req, res));

/**
 * @route DELETE /delete-category/:id
 * @description Delete category by ID (if no foreign key constraints).
 */
productRoutes.delete('/delete-category/:id', (req, res) => controller.deleteCategory(req, res));

/**
 * @route POST /set-mother-plant-type
 * @description Create a new mother plant type. Body: { name: string }
 */
productRoutes.post('/set-mother-plant-type', (req, res) => controller.setMotherPlantType(req, res));

/**
 * @route GET /get-all-mother-plant-type
 * @description Get all mother plant types.
 */
productRoutes.get('/get-all-mother-plant-type', (req, res) => controller.getAllMotherPlantType(req, res));

/**
 * @route GET /get-mother-plant-type-by-id/:id
 * @description Get mother plant type by ID.
 */
productRoutes.get('/get-mother-plant-type-by-id/:id', (req, res) => controller.getMotherPlantTypeById(req, res));

/**
 * @route DELETE /delete-mother-plant-type/:id
 * @description Delete mother plant type by ID (if no foreign key constraints).
 */
productRoutes.delete('/delete-mother-plant-type/:id', (req, res) => controller.deleteMotherPlantType(req, res));

/**
 * @route POST /set-size
 * @description Create a new size. Body: { size: string, short_key: string }
 */
productRoutes.post('/set-size', (req, res) => controller.setSize(req, res));

/**
 * @route GET /get-all-size
 * @description Get all sizes.
 */
productRoutes.get('/get-all-size', (req, res) => controller.getAllSize(req, res));

/**
 * @route GET /get-size-by-id/:id
 * @description Get size by ID.
 */
productRoutes.get('/get-size-by-id/:id', (req, res) => controller.getSizeById(req, res));

/**
 * @route DELETE /delete-size/:id
 * @description Delete size by ID (if no foreign key constraints).
 */
productRoutes.delete('/delete-size/:id', (req, res) => controller.deleteSize(req, res));

export default productRoutes;
