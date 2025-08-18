import type { Response, Stock } from "../types/EntityType.js";
export declare class StockController {
    private stockService;
    setStock(imageFiles: Express.Multer.File[] | null, data: Stock): Promise<Response>;
    deleteBatch(batch_id: number): Promise<Response>;
}
//# sourceMappingURL=StockController.d.ts.map