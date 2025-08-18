import { PrismaClient } from "../generated/prisma/index.js";
import type { PaymentMethod, Response } from "../types/EntityType.js";
import type { PaymentMethodErr } from "../types/ErrorType.js";

export class PaymentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPaymentMethod(data: PaymentMethod): Promise<Response> {
    try {
      // Basic validation
      const errors: PaymentMethodErr = {};
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
    } catch (error: any) {
      throw new Error(`Failed to create payment method: ${error.message}`);
    }
  }

  async getPaymentMethodById(id: number): Promise<Response> {
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
    } catch (error: any) {
      throw new Error(`Failed to retrieve payment method: ${error.message}`);
    }
  }

  async getAllPaymentMethods(): Promise<Response> {
    try {
      const paymentMethods = await this.prisma.payment_method.findMany();

      return {
        status: 200,
        message: "Payment methods retrieved successfully",
        data: paymentMethods,
      };
    } catch (error: any) {
      throw new Error(`Failed to retrieve payment methods: ${error.message}`);
    }
  }

  async updatePaymentMethod(id: number, data: Partial<PaymentMethod>): Promise<Response> {
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
      const errors: PaymentMethodErr = {};
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
    } catch (error: any) {
      throw new Error(`Failed to update payment method: ${error.message}`);
    }
  }

  async deletePaymentMethod(id: number): Promise<Response> {
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
    } catch (error: any) {
      throw new Error(`Failed to delete payment method: ${error.message}`);
    }
  }
}