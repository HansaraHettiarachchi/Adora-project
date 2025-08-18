import type { Invoice, PaymentMethod, Response } from "../types/EntityType.js";
export declare class PaymentController {
    private paymentService;
    setPaymentMethod(data: PaymentMethod): Promise<Response>;
    getPaymentMethodById(id: number): Promise<Response>;
    getAllPaymentMethods(): Promise<Response>;
    updatePaymentMethod(id: number, data: Partial<PaymentMethod>): Promise<Response>;
    deletePaymentMethod(id: number): Promise<Response>;
    setInvoice(data: Invoice): Promise<Response>;
    getInvoiceDataById(id: number): Promise<Response>;
    getAllInvoices(): Promise<Response>;
}
//# sourceMappingURL=PaymentController.d.ts.map