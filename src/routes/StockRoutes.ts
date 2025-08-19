import { Router } from 'express';
import { StockController } from '../controller/StockController.js';
import { authenticate } from '../middleware/auth.js';
import { FileUploader } from '../util/FileUploader.js';

const stockRoutes = Router();
/**
 * @route GET /batches/:product_id
 * @description Get all batch details by product id
 * @access Protected
 * @params
 *   - product_id: number (required)
 * @example Request:
 *   GET /batches/1
 *   Headers: { "Authorization": "Bearer <token>" }
 * @example Success Response:
 *   {
 *     "status": 200,
 *     "message": "Batches fetched successfully",
 *     "data": [
 *       {
 *         "id": 1,
 *         "qty": 100,
 *         "price": 50.0,
 *         "cost": 40.0,
 *         "desc": "Batch description",
 *         "product_id": 1,
 *         "size_id": 1,
 *         "code": "BATCH001",
 *         "product_images": [ { "id": 1, "name": "batch/1/image.png", "batch_id": 1 } ],
 *         "product": { "id": 1, "name": "Product Name", ... },
 *         "size": { "id": 1, "size": "Large", ... }
 *       }
 *     ]
 *   }
 * @example Not Found Response:
 *   {
 *     "status": 404,
 *     "message": "No batches found",
 *     "data": []
 *   }
 * @example Error Response:
 *   {
 *     "status": 500,
 *     "message": "Internal server error",
 *     "error": "...error details..."
 *   }
 */
stockRoutes.get('/batches/:product_id', authenticate, async (req, res) => {
    const product_id = Number(req.params.product_id);
    const result = await controller.getBatchesByProductId(product_id);
    res.status(result.status).json(result);
});
const controller = new StockController();
const upload = FileUploader.getMulter();

/**
 * @route POST /set-stock
 * @description Set or update stock (batch)
 * @access Protected
 * @body (multipart/form-data)
 *   - images: File[] (batch images)
 *   - data: JSON stringified object matching the Stock type
 *     {
 *       "product_id": 1,
 *       "qty": 100,
 *       "cost": 40.0,
 *       "price": 50.0,
 *       "size_id": 1,
 *       "code": "BATCH001"
 *     }
 * @response
 *   {
 *     "status": 201,
 *     "message": "Stock processed successfully",
 *     "data": {
 *       "id": 1,
 *       "product_id": 1,
 *       "qty": 100,
 *       "cost": 40.0,
 *       "price": 50.0,
 *       "size_id": 1,
 *       "code": "BATCH001"
 *     }
 *   }
 *   If validation error: { "status": 400, "message": "Validation error", "data": { ...fields } }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
stockRoutes.post('/set-stock', authenticate, upload.array('images'), async (req, res) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        if (!req.body.data) {
            return res.status(400).json({ error: 'data needs to be provided according to the Stock format' });
        }
        const data = JSON.parse(req.body.data);
        const result = await controller.setStock(imageFiles, data);
        res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @route DELETE /delete-batch/:id
 * @description Delete batch by ID
 * @access Protected
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "message": "Batch deleted successfully"
 *   }
 *   If related order items exist: { "status": 409, "message": "Cannot delete batch: related order items exist" }
 *   If not found: { "status": 404, "message": "Batch not found" }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
stockRoutes.delete('/delete-batch/:id', authenticate, async (req, res) => {
    const batch_id = Number(req.params.id);
    const result = await controller.deleteBatch(batch_id);
    res.status(result.status).json(result);
});

export { stockRoutes };
