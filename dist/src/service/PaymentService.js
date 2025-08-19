import { PrismaClient } from "../generated/prisma/index.js";
export class PaymentService {
    prisma;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async createPaymentMethod(data) {
        try {
            // Basic validation
            const errors = {};
            if (!data.name || data.name.trim() === "") {
                errors.name = "Payment method name is required";
            }
            if (data.name && data.name.length > 20) {
                errors.name = "Payment method name must be 20 characters or less";
            }
            if (Object.keys(errors).length > 0) {
                return {
                    status: 400,
                    message: "Validation failed",
                    data: errors,
                };
            }
            // Check if payment method with the same name exists
            const existing = await this.prisma.payment_method.findFirst({
                where: { name: data.name },
            });
            if (existing) {
                return {
                    status: 409,
                    message: "Payment method with this name already exists",
                    data: null,
                };
            }
            const paymentMethod = await this.prisma.payment_method.create({
                data: {
                    name: data.name,
                },
            });
            return {
                status: 201,
                message: "Payment method created successfully",
                data: paymentMethod,
            };
        }
        catch (error) {
            throw new Error(`Failed to create payment method: ${error.message}`);
        }
    }
    async getPaymentMethodById(id) {
        try {
            // Validate ID
            if (!Number.isInteger(id) || id <= 0) {
                return {
                    status: 400,
                    message: "Invalid payment method ID",
                    data: null,
                };
            }
            const paymentMethod = await this.prisma.payment_method.findUnique({
                where: { id },
            });
            if (!paymentMethod) {
                return {
                    status: 404,
                    message: "Payment method not found",
                    data: null,
                };
            }
            return {
                status: 200,
                message: "Payment method retrieved successfully",
                data: paymentMethod,
            };
        }
        catch (error) {
            throw new Error(`Failed to retrieve payment method: ${error.message}`);
        }
    }
    async getAllPaymentMethods() {
        try {
            const paymentMethods = await this.prisma.payment_method.findMany();
            return {
                status: 200,
                message: "Payment methods retrieved successfully",
                data: paymentMethods,
            };
        }
        catch (error) {
            throw new Error(`Failed to retrieve payment methods: ${error.message}`);
        }
    }
    async updatePaymentMethod(id, data) {
        try {
            // Validate ID
            if (!Number.isInteger(id) || id <= 0) {
                return {
                    status: 400,
                    message: "Invalid payment method ID",
                    data: null,
                };
            }
            // Validate input
            const errors = {};
            if (data.name && data.name.trim() === "") {
                errors.name = "Payment method name cannot be empty";
            }
            if (data.name && data.name.length > 20) {
                errors.name = "Payment method name must be 20 characters or less";
            }
            if (Object.keys(errors).length > 0) {
                return {
                    status: 400,
                    message: "Validation failed",
                    data: errors,
                };
            }
            // Check if payment method exists
            const existing = await this.prisma.payment_method.findUnique({
                where: { id },
            });
            if (!existing) {
                return {
                    status: 404,
                    message: "Payment method not found",
                    data: null,
                };
            }
            // Check for duplicate name
            if (data.name && data.name !== existing.name) {
                const nameExists = await this.prisma.payment_method.findFirst({
                    where: { name: data.name },
                });
                if (nameExists) {
                    return {
                        status: 409,
                        message: "Payment method with this name already exists",
                        data: null,
                    };
                }
            }
            const updatedPaymentMethod = await this.prisma.payment_method.update({
                where: { id },
                data: {
                    name: data.name ?? existing.name,
                },
            });
            return {
                status: 200,
                message: "Payment method updated successfully",
                data: updatedPaymentMethod,
            };
        }
        catch (error) {
            throw new Error(`Failed to update payment method: ${error.message}`);
        }
    }
    async deletePaymentMethod(id) {
        try {
            // Validate ID
            if (!Number.isInteger(id) || id <= 0) {
                return {
                    status: 400,
                    message: "Invalid payment method ID",
                    data: null,
                };
            }
            // Check if payment method exists
            const existing = await this.prisma.payment_method.findUnique({
                where: { id },
            });
            if (!existing) {
                return {
                    status: 404,
                    message: "Payment method not found",
                    data: null,
                };
            }
            // Check if payment method is referenced in invoices or card_details
            const referencedInInvoices = await this.prisma.invoice.findFirst({
                where: { payment_method_id: id },
            });
            const referencedInCardDetails = await this.prisma.card_details.findFirst({
                where: { payment_method_id: id },
            });
            if (referencedInInvoices || referencedInCardDetails) {
                return {
                    status: 400,
                    message: "Cannot delete payment method as it is referenced in invoices or card details",
                    data: null,
                };
            }
            await this.prisma.payment_method.delete({
                where: { id },
            });
            return {
                status: 200,
                message: "Payment method deleted successfully",
                data: null,
            };
        }
        catch (error) {
            throw new Error(`Failed to delete payment method: ${error.message}`);
        }
    }
    // Invoice endpoints
    async createInvoice(data) {
        const prisma = this.prisma;
        try {
            // DB validation: check payment method and user exist
            const paymentMethod = await prisma.payment_method.findUnique({ where: { id: data.payment_method_id } });
            if (!paymentMethod) {
                return { status: 404, message: "Payment method not found", data: null };
            }
            const user = await prisma.users.findUnique({ where: { id: data.users_id } });
            if (!user) {
                return { status: 404, message: "User not found", data: null };
            }
            // Transaction for invoice, items, and batch qty update
            const result = await prisma.$transaction(async (tx) => {
                // Create invoice
                const invoice = await tx.invoice.create({
                    data: {
                        total: data.total,
                        qty: data.qty,
                        datetime: new Date(data.datetime),
                        discount: data.discount,
                        payment_method_id: data.payment_method_id,
                        users_id: data.users_id,
                    }
                });
                const items = [];
                for (const item of data.invoice_items) {
                    const batch = await tx.batch.findUnique({ where: { id: item.batch_id } });
                    if (!batch) {
                        throw new Error(`Batch not found for id ${item.batch_id}`);
                    }
                    const itemQty = item.qty ?? batch.qty;
                    if (batch.qty < itemQty) {
                        throw new Error(`Insufficient stock in batch ${item.batch_id}. Available: ${batch.qty}, Requested: ${itemQty}`);
                    }
                    // Subtract qty from batch
                    await tx.batch.update({
                        where: { id: batch.id },
                        data: { qty: batch.qty - itemQty }
                    });
                    // Create invoice item
                    const createdItem = await tx.invoice_items.create({
                        data: {
                            price: item.price ?? batch.price,
                            cost: item.cost ?? batch.cost,
                            product_id: item.product_id ?? batch.product_id,
                            qty: itemQty,
                            batch_id: item.batch_id,
                            invoice_id: invoice.id,
                            product_type_id: item.product_type_id,
                        }
                    });
                    items.push(createdItem);
                }
                return { invoice, invoice_items: items };
            });
            return { status: 201, message: "Invoice created successfully", data: { ...result.invoice, invoice_items: result.invoice_items } };
        }
        catch (error) {
            // Transaction errors (including thrown errors above)
            return { status: 400, message: error.message || "Failed to create invoice", data: null };
        }
    }
    async getInvoiceDataById(id) {
        try {
            const invoice = await this.prisma.invoice.findUnique({
                where: { id },
            });
            if (!invoice) {
                return { status: 404, message: "Invoice not found", data: null };
            }
            const items = await this.prisma.invoice_items.findMany({
                where: { invoice_id: id },
            });
            return { status: 200, message: "Invoice data fetched", data: { ...invoice, invoice_items: items } };
        }
        catch (error) {
            return { status: 500, message: error.message || "Failed to fetch invoice data", data: null };
        }
    }
    async getAllInvoices() {
        try {
            const invoices = await this.prisma.invoice.findMany();
            const result = await Promise.all(invoices.map(async (inv) => {
                const items = await this.prisma.invoice_items.findMany({ where: { invoice_id: inv.id } });
                return { ...inv, invoice_items: items };
            }));
            return { status: 200, message: "All invoices fetched", data: result };
        }
        catch (error) {
            return { status: 500, message: error.message || "Failed to fetch invoices", data: null };
        }
    }
}
//# sourceMappingURL=PaymentService.js.map