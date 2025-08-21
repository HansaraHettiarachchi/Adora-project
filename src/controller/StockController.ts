import { StockService } from "../service/StockService.js";
import type { Response, Stock } from "../types/EntityType.js";
import type { StockErr } from "../types/ErrorType.js";


export class StockController {
    async getBatchesByProductId(product_id: number): Promise<Response> {
        if (typeof product_id !== 'number' || isNaN(product_id) || product_id <= 0) {
            return {
                status: 400,
                message: 'Invalid product_id',
                data: null
            };
        }
        return await this.stockService.getBatchesByProductId(product_id);
    }
    private stockService: StockService = new StockService();

    async getBatchById(batch_id: number): Promise<Response> {
        if (typeof batch_id !== 'number' || isNaN(batch_id) || batch_id <= 0) {
            return {
                status: 400,
                message: 'Invalid batch_id',
                data: null
            };
        }
        return await this.stockService.getBatchById(batch_id);
    }

    async setStock(imageFiles: Express.Multer.File[] | null, data: Stock): Promise<Response> {
        // Data validation
        const errors: StockErr = {};

        // Ensure id is set to 0 if not provided
        if (typeof data.id !== 'number') {
            data.id = 0;
        }

        if (!data.product_id) errors.product_id = "Product ID is required";
        if (!data.qty || data.qty <= 0) errors.qty = "Quantity must be greater than 0";
        if (!data.id && !data.size_id) {
            errors.size_id = "Size ID is required for new batch";
        }
        if (Object.keys(errors).length > 0) {
            return {
                status: 400,
                message: "Validation error",
                data: errors
            };
        }
        return await this.stockService.setStock(data, imageFiles);
    }

    async deleteBatch(batch_id: number): Promise<Response> {
        if (!batch_id) {
            return {
                status: 400,
                message: "Batch ID is required",
                data: null
            };
        }
        return await this.stockService.deleteBatch(batch_id);
    }
}
