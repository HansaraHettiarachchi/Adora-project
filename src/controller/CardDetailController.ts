import { CardDetailService } from "../service/CardDetailService.js";
import type { Response } from "../types/EntityType.js";

export type CardDetail = {
    id: number;
    card_no: number;
    payment_method_id: number;
    cvv?: number | null;
    exp?: string | null;
};

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
