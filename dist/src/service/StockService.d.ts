import type { Response } from '../types/EntityType.js';
import type { Stock } from '../types/EntityType.js';
export declare class StockService {
    deleteBatchImages(batch_id: number): Promise<void>;
    private generateUniqueCode;
    setStock(data: Stock, imageFiles: Express.Multer.File[] | null): Promise<Response>;
    deleteBatch(batch_id: number): Promise<Response>;
}
//# sourceMappingURL=StockService.d.ts.map