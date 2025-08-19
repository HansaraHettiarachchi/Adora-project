import type { PaymentMethod, Response } from "../types/EntityType.js";
export declare class PaymentService {
    private prisma;
    constructor();
    createPaymentMethod(data: PaymentMethod): Promise<Response>;
    getPaymentMethodById(id: number): Promise<Response>;
    getAllPaymentMethods(): Promise<Response>;
    updatePaymentMethod(id: number, data: Partial<PaymentMethod>): Promise<Response>;
    deletePaymentMethod(id: number): Promise<Response>;
    createInvoice(data: any): Promise<Response>;
    getInvoiceDataById(id: number): Promise<Response>;
    getAllInvoices(): Promise<Response>;
}
//# sourceMappingURL=PaymentService.d.ts.map