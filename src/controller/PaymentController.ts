import { PaymentService } from "../service/PaymentService.js";
import type { PaymentMethod, Response } from "../types/EntityType.js";

export class PaymentController {
    private paymentService: PaymentService = new PaymentService();

    async setPaymentMethod(data: PaymentMethod): Promise<Response> {
        return this.paymentService.createPaymentMethod(data);
    }

    async getPaymentMethodById(id: number): Promise<Response> {
        return this.paymentService.getPaymentMethodById(id);
    }

    async getAllPaymentMethods(): Promise<Response> {
        return this.paymentService.getAllPaymentMethods();
    }

    async updatePaymentMethod(id: number, data: Partial<PaymentMethod>): Promise<Response> {
        return this.paymentService.updatePaymentMethod(id, data);
    }

    async deletePaymentMethod(id: number): Promise<Response> {
        return this.paymentService.deletePaymentMethod(id);
    }
}