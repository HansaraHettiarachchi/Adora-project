
/**
 * INSTRUCTIONS FOR MAINTAINING AND EXTENDING ProductRoutes.ts
 *
 * Purpose:
 *   - This file defines all Express routes for product, category, mother plant type, and size management.
 *   - Each route connects HTTP endpoints to ProductController methods for CRUD and query operations.
 *
 * Structure:
 *   - Uses Express Router.
 *   - Instantiates ProductController as 'controller'.
 *   - Each route is documented with JSDoc comments specifying method, endpoint, description, and request details.
 *
 * Route Groups:
 *   1. Products
 *      - GET /products: Paginated list (query: page, pageSize)
 *      - GET /product-detail/:id: Nested product detail by ID
 *      - POST /create-product: Create new product
 *      - GET /get-all-products: All products
 *      - GET /get-product-by-id/:id: Product by ID
 *      - DELETE /delete-product/:id: Delete product by ID
 *   2. Categories
 *      - POST /set-category: Create category
 *      - GET /get-all-category: All categories
 *      - GET /get-category-by-id/:id: Category by ID
 *      - DELETE /delete-category/:id: Delete category
 *   3. Mother Plant Types
 *      - POST /set-mother-plant-type: Create mother plant type
 *      - GET /get-all-mother-plant-type: All mother plant types
 *      - GET /get-mother-plant-type-by-id/:id: Mother plant type by ID
 *      - DELETE /delete-mother-plant-type/:id: Delete mother plant type
 *   4. Sizes
 *      - POST /set-size: Create size
 *      - GET /get-all-size: All sizes
 *      - GET /get-size-by-id/:id: Size by ID
 *      - DELETE /delete-size/:id: Delete size
 *
 * Error Handling:
 *   - All routes use try/catch.
 *   - On error, respond with status 500 and a JSON error message.
 *
 * Adding New Routes:
 *   - Add a JSDoc comment above the route for documentation.
 *   - Use productRoutes.<method>(<path>, async (req, res) => { ... })
 *   - Call the appropriate method on 'controller'.
 *   - Handle errors as shown in existing routes.
 *
 * Export:
 *   - The router is exported as default for use in the main app.
 *
 * Follow this structure and style for consistency and maintainability when updating or adding routes.
 */

import { Router } from 'express';
import { ProductController } from '../controller/ProductController.js';

const productRoutes = Router();
// ...existing code...

/**
 * @route GET /products
 * @description Get paginated products.
 * @query
 *   - page: number (required)
 *   - pageSize: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "name": "Product Name",
 *         "desc": "Description",
 *         "mother_plant_type_id": 1,
 *         "category_id": 2,
 *         "isActive": true
 *       }
 *     ],
 *     "pagination": {
 *       "page": 1,
 *       "pageSize": 10,
 *       "total": 100
 *     }
 *   }
 */
productRoutes.get('/products', async (req, res) => {
	try {
		await controller.getPaginatedProductsWithLargestBatchImage(req, res);
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

/**
 * @route GET /product-details/:id
 * @description Get detailed product info by product ID, including batches and images.
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "id": 1,
 *     "name": "Product Name",
 *     "desc": "Description",
 *     "mother_plant_type": { "id": 1, "name": "Type A" },
 *     "category": { "id": 2, "name": "Category B" },
 *     "isActive": true,
 *     "batches": [
 *       {
 *         "id": 10,
 *         "qty": 100,
 *         "price": 50.0,
 *         "cost": 40.0,
 *         "desc": "Batch description",
 *         "size_id": 1,
 *         "code": "BATCH001",
 *         "images": [
 *           { "id": 100, "name": "img1.png", "batch_id": 10 },
 *           { "id": 101, "name": "img2.png", "batch_id": 10 }
 *         ]
 *       }
 *     ]
 *   }
 *   If not found: { "error": "Product not found" }
 */
productRoutes.get('/product-details/:id', async (req, res) => {
	await controller.getProductDetailById(req, res);
});

/**
 * @route POST /create-product
 * @description Create a new product.
 * @body
 *   {
 *     "name": "Product Name", // string, required
 *     "desc": "Description", // string, required
 *     "mother_plant_type_id": 1, // number, required
 *     "category_id": 2, // number, required
 *     "isActive": true // boolean, required
 *   }
 * @response
 *   {
 *     "status": 201,
 *     "data": {
 *       "id": 1,
 *       "name": "Product Name",
 *       "desc": "Description",
 *       "mother_plant_type_id": 1,
 *       "category_id": 2,
 *       "isActive": true
 *     }
 *   }
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
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "name": "Product Name",
 *         "desc": "Description",
 *         "mother_plant_type_id": 1,
 *         "category_id": 2,
 *         "isActive": true
 *       }
 *     ]
 *   }
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
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": {
 *       "id": 1,
 *       "name": "Product Name",
 *       "desc": "Description",
 *       "mother_plant_type_id": 1,
 *       "category_id": 2,
 *       "isActive": true
 *     }
 *   }
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
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "message": "Product deleted successfully"
 *   }
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
 * @description Create a new category.
 * @body
 *   {
 *     "name": "Category Name" // string, required
 *   }
 * @response
 *   {
 *     "status": 201,
 *     "data": {
 *       "id": 1,
 *       "name": "Category Name"
 *     }
 *   }
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
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "name": "Category Name"
 *       }
 *     ]
 *   }
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
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": {
 *       "id": 1,
 *       "name": "Category Name"
 *     }
 *   }
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
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "message": "Category deleted successfully"
 *   }
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
 * @description Create a new mother plant type.
 * @body
 *   {
 *     "name": "Mother Plant Type Name" // string, required
 *   }
 * @response
 *   {
 *     "status": 201,
 *     "data": {
 *       "id": 1,
 *       "name": "Mother Plant Type Name"
 *     }
 *   }
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
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "name": "Mother Plant Type Name"
 *       }
 *     ]
 *   }
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
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": {
 *       "id": 1,
 *       "name": "Mother Plant Type Name"
 *     }
 *   }
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
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "message": "Mother plant type deleted successfully"
 *   }
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
 * @description Create a new size.
 * @body
 *   {
 *     "size": "Large", // string, required
 *     "short_key": "L" // string, required
 *   }
 * @response
 *   {
 *     "status": 201,
 *     "data": {
 *       "id": 1,
 *       "size": "Large",
 *       "short_key": "L"
 *     }
 *   }
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
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "size": "Large",
 *         "short_key": "L"
 *       }
 *     ]
 *   }
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
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": {
 *       "id": 1,
 *       "size": "Large",
 *       "short_key": "L"
 *     }
 *   }
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
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "message": "Size deleted successfully"
 *   }
 */
productRoutes.delete('/delete-size/:id', async (req, res) => {
	try {
		await controller.deleteSize(req, res);
	} catch (error) {
	res.status(500).json({ status: 500, message: 'Internal server error', error: String(error) });
	}
});

export default productRoutes;
