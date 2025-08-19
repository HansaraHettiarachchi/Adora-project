
import { PaymentService } from "../service/PaymentService.js";
import type { Invoice, PaymentMethod, Response } from "../types/EntityType.js";
import type { InvoiceErr } from "../types/ErrorType.js";
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

    async setInvoice(data: Invoice): Promise<Response> {
        const errors: InvoiceErr = {};
        if (typeof data.total !== "number") errors.total = "Total is required and must be a number";
        if (typeof data.qty !== "number") errors.qty = "Qty is required and must be a number";
        if (typeof data.datetime !== "string" || !data.datetime) errors.datetime = "Datetime is required and must be a string";
        if (typeof data.discount !== "number") errors.discount = "Discount must be a number";
        if (typeof data.payment_method_id !== "number") errors.payment_method_id = "Payment method id is required and must be a number";
        if (typeof data.users_id !== "number") errors.users_id = "Users id is required and must be a number";
        if (!Array.isArray(data.invoice_items) || data.invoice_items.length === 0) errors.invoice_items = "Invoice items are required";
        if (Object.keys(errors).length > 0) {
            return {
                status: 400,
                message: "Validation failed",
                data: errors,
            };
        }
        return this.paymentService.createInvoice(data);
    }

    async getInvoiceDataById(id: number): Promise<Response> {
        const errors: InvoiceErr = {};
        if (typeof id !== "number" || !id) {
            errors.id = "Invoice id is required and must be a number";
            return {
                status: 400,
                message: "Invalid invoice id",
                data: errors,
            };
        }
        return this.paymentService.getInvoiceDataById(id);
    }

    async getAllInvoices(): Promise<Response> {
        return this.paymentService.getAllInvoices();
    }

    /**
     * Get paginated invoices with items
     */
    async getPaginatedInvoices(page: number, pageSize: number): Promise<Response> {
        return this.paymentService.getPaginatedInvoices(page, pageSize);
    }
}