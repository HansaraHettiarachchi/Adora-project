import { PrismaClient } from "../generated/prisma/index.js";
import type { PaymentMethod, Response } from "../types/EntityType.js";
import type { PaymentMethodErr } from "../types/ErrorType.js";

export class PaymentService {
    private prisma: PrismaClient = new PrismaClient();

    // Create Payment Method
    async createPaymentMethod(paymentMethodData: PaymentMethod): Promise<Response> {
        try {
            const existingPaymentMethod = await this.prisma.payment_method.findFirst({
                where: {
                    name: paymentMethodData.name
                }
            });

            if (existingPaymentMethod) {
                const errors: PaymentMethodErr = { name: "Payment method name already exists" };
                return { status: 409, data: errors, message: "error" };
            }

            await this.prisma.payment_method.create({ data: paymentMethodData });
            return { status: 200, data: "Payment Method Registered Successfully", message: "success" };
        } catch (error: any) {
            console.error("Error creating payment method:", error);
            return { status: 401, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }

    // Get Payment Method by ID
    async getPaymentMethodById(paymentMethodId: number): Promise<Response> {
        try {
            const paymentMethod = await this.prisma.payment_method.findUnique({ where: { id: paymentMethodId } });
            if (!paymentMethod) {
                return { status: 404, data: null, message: "Payment Method not found" };
            }
            return { status: 200, data: paymentMethod, message: "success" };
        } catch (error: any) {
            console.error("Error fetching payment method:", error);
            return { status: 401, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }

    // Get All Payment Methods
    async getAllPaymentMethods(): Promise<Response> {
        try {
            const paymentMethods = await this.prisma.payment_method.findMany();
            return { status: 200, data: paymentMethods, message: "success" };
        } catch (error: any) {
            console.error("Error fetching payment methods:", error);
            return { status: 401, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }

    // Update Payment Method
    async updatePaymentMethod(paymentMethodId: number, updateData: Partial<PaymentMethod>): Promise<Response> {
        try {
            await this.prisma.payment_method.update({ where: { id: paymentMethodId }, data: updateData });
            return { status: 200, data: "Payment Method Updated Successfully", message: "success" };
        } catch (error: any) {
            console.error("Error updating payment method:", error);
            return { status: 401, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }

    // Delete Payment Method
    async deletePaymentMethod(paymentMethodId: number): Promise<Response> {
        try {
            await this.prisma.payment_method.delete({ where: { id: paymentMethodId } });
            return { status: 200, data: "Payment Method Deleted Successfully", message: "success" };
        } catch (error: any) {
            console.error("Error deleting payment method:", error);
            return { status: 401, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }
}