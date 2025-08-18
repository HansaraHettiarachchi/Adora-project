import { StockService } from "../service/StockService.js";
import type { Response, Stock } from "../types/EntityType.js";
import type { StockErr } from "../types/ErrorType.js";


export class StockController {
    private stockService: StockService = new StockService();

    async setStock(imageFiles: Express.Multer.File[] | null, data: Stock): Promise<Response> {
        // Data validation
        const errors: StockErr = {};

        if (!data.product_id) errors.product_id = "Product ID is required";
        if (!data.qty || data.qty <= 0) errors.qty = "Quantity must be greater than 0";
        if (!data.id && (!data.size_id || !data.code)) {
            errors.size_id = "Size ID is required for new batch";
            errors.code = "Code is required for new batch";
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
