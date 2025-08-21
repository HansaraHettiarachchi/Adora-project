import { PrismaClient } from "../generated/prisma/index.js";
import type { Supplier, Response } from "../types/EntityType.js";
import type { SupplierErr } from "../types/ErrorType.js";

export class SupplierService {
    private prisma: PrismaClient = new PrismaClient();

    // Create Supplier
    async createSupplier(supplierData: Supplier): Promise<Response> {
        try {
            const existingSupplier = await this.prisma.supplier.findFirst({
                where: {
                    OR: [
                        { email: supplierData.email },
                        { mobile: supplierData.mobile }
                    ]
                }
            });

            if (existingSupplier) {
                const errors: SupplierErr = { fullname: "", company: "", address: "", email: "", mobile: "" };
                if (supplierData.email === existingSupplier.email) {
                    errors.email = "Email already exists";
                }
                if (supplierData.mobile === existingSupplier.mobile) {
                    errors.mobile = "Mobile number already exists";
                }
                return { status: 409, data: errors, message: "error" };
            }

            const supplier = await this.prisma.supplier.create({
                data: {
                    fullname: supplierData.fullname,
                    company: supplierData.company,
                    address: supplierData.address,
                    email: supplierData.email,
                    mobile: supplierData.mobile,
                    isActive: supplierData.isActive ?? true, // Default to true if not provided
                    status_id: supplierData.status_id,
                    gender_id: supplierData.gender_id,
                    city_id: supplierData.city_id,
                }
            });
            return { status: 201, data: supplier, message: "Supplier Registered Successfully" };
        } catch (error: any) {
            console.error("Error creating supplier:", error);
            return { status: 400, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }

    // Get Supplier by ID
    async getSupplierById(supplierId: number): Promise<Response> {
        try {
            const supplier = await this.prisma.supplier.findUnique({ where: { id: supplierId } });
            if (!supplier) {
                return { status: 404, data: null, message: "Supplier not found" };
            }
            return { status: 200, data: supplier, message: "success" };
        } catch (error: any) {
            console.error("Error fetching supplier:", error);
            return { status: 400, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }

    // Get All Suppliers
    async getAllSuppliers(): Promise<Response> {
        try {
            const suppliers = await this.prisma.supplier.findMany();
            return { status: 200, data: suppliers, message: "success" };
        } catch (error: any) {
            console.error("Error fetching suppliers:", error);
            return { status: 400, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }

    // Update Supplier
    async updateSupplier(supplierId: number, updateData: Partial<Supplier>): Promise<Response> {
        try {
            const supplier = await this.prisma.supplier.update({
                where: { id: supplierId },
                data: updateData
            });
            return { status: 200, data: supplier, message: "Supplier Updated Successfully" };
        } catch (error: any) {
            console.error("Error updating supplier:", error);
            return { status: 400, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }

    // Delete Supplier
    async deleteSupplier(supplierId: number): Promise<Response> {
        try {
            await this.prisma.supplier.delete({ where: { id: supplierId } });
            return { status: 200, data: "Supplier Deleted Successfully", message: "success" };
        } catch (error: any) {
            console.error("Error deleting supplier:", error);
            return { status: 400, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }
}