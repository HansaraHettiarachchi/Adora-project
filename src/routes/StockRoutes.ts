import { Router } from 'express';
import { StockController } from '../controller/StockController.js';
import { authenticate } from '../middleware/auth.js';
import { FileUploader } from '../util/FileUploader.js';

const stockRoutes = Router();
const controller = new StockController();
const upload = FileUploader.getMulter();

/**
 * @route POST /set-stock
 * @description Set or update stock (batch)
 * @access Protected
 *
 * Expected multipart/form-data payload:
 * - images: File[] (batch images)
 * - data: JSON stringified object matching the Stock type
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
 */
stockRoutes.delete('/delete-batch/:id', authenticate, async (req, res) => {
    const batch_id = Number(req.params.id);
    const result = await controller.deleteBatch(batch_id);
    res.status(result.status).json(result);
});

export { stockRoutes };
