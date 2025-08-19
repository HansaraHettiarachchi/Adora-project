import { PaymentService } from "../service/PaymentService.js";
export class PaymentController {
    paymentService = new PaymentService();
    async setPaymentMethod(data) {
        return this.paymentService.createPaymentMethod(data);
    }
    async getPaymentMethodById(id) {
        return this.paymentService.getPaymentMethodById(id);
    }
    async getAllPaymentMethods() {
        return this.paymentService.getAllPaymentMethods();
    }
    async updatePaymentMethod(id, data) {
        return this.paymentService.updatePaymentMethod(id, data);
    }
    async deletePaymentMethod(id) {
        return this.paymentService.deletePaymentMethod(id);
    }
    async setInvoice(data) {
        const errors = {};
        if (typeof data.total !== "number")
            errors.total = "Total is required and must be a number";
        if (typeof data.qty !== "number")
            errors.qty = "Qty is required and must be a number";
        if (typeof data.datetime !== "string" || !data.datetime)
            errors.datetime = "Datetime is required and must be a string";
        if (typeof data.discount !== "number")
            errors.discount = "Discount must be a number";
        if (typeof data.payment_method_id !== "number")
            errors.payment_method_id = "Payment method id is required and must be a number";
        if (typeof data.users_id !== "number")
            errors.users_id = "Users id is required and must be a number";
        if (!Array.isArray(data.invoice_items) || data.invoice_items.length === 0)
            errors.invoice_items = "Invoice items are required";
        if (Object.keys(errors).length > 0) {
            return {
                status: 400,
                message: "Validation failed",
                data: errors,
            };
        }
        return this.paymentService.createInvoice(data);
    }
    async getInvoiceDataById(id) {
        const errors = {};
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
    async getAllInvoices() {
        return this.paymentService.getAllInvoices();
    }
}
//# sourceMappingURL=PaymentController.js.map