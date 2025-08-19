import { CardDetailService } from "../service/CardDetailService.js";
import type { Response, CardDetail } from "../types/EntityType.js";

export class CardDetailController {
    private cardDetailService: CardDetailService = new CardDetailService();

    async setCardDetailMethod(data: CardDetail): Promise<Response> {
        return this.cardDetailService.createCardDetail(data);
    }

    async getCardDetailMethodById(id: number): Promise<Response> {
        return this.cardDetailService.getCardDetailById(id);
    }

    async deleteCardDetailMethod(id: number): Promise<Response> {
        return this.cardDetailService.deleteCardDetail(id);
    }
}
