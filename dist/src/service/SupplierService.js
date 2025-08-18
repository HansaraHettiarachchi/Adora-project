import { error } from "console";
import { PrismaClient } from "../generated/prisma/index.js";
export class SupplierService {
    prisma = new PrismaClient();
    // Create Supplier
    async createSupplier(supplierData) {
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
                const errors = { fullname: "", company: "", address: "", email: "", mobile: "" };
                if (supplierData.email === existingSupplier.email) {
                    errors.email = "Email already exists";
                }
                if (supplierData.mobile === existingSupplier.mobile) {
                    errors.mobile = "Mobile number already exists";
                }
                return { status: 409, data: error, message: "error" };
            }
            await this.prisma.supplier.create({ data: supplierData });
            return { status: 200, data: "Supplier Registered Successfully", message: "success" };
        }
        catch (error) {
            console.error("Error creating supplier:", error);
            return { status: 401, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }
    // Get Supplier by ID
    async getSupplierById(supplierId) {
        try {
            const supplier = await this.prisma.supplier.findUnique({ where: { id: supplierId } });
            if (!supplier) {
                return { status: 404, data: null, message: "Supplier not found" };
            }
            return { status: 200, data: supplier, message: "success" };
        }
        catch (error) {
            console.error("Error fetching supplier:", error);
            return { status: 401, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }
    // Get All Suppliers
    async getAllSuppliers() {
        try {
            const suppliers = await this.prisma.supplier.findMany();
            return { status: 200, data: suppliers, message: "success" };
        }
        catch (error) {
            console.error("Error fetching suppliers:", error);
            return { status: 401, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }
    // Update Supplier
    async updateSupplier(supplierId, updateData) {
        try {
            await this.prisma.supplier.update({ where: { id: supplierId }, data: updateData });
            return { status: 200, data: "Supplier Updated Successfully", message: "success" };
        }
        catch (error) {
            console.error("Error updating supplier:", error);
            return { status: 401, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }
    // Delete Supplier
    async deleteSupplier(supplierId) {
        try {
            await this.prisma.supplier.delete({ where: { id: supplierId } });
            return { status: 200, data: "Supplier Deleted Successfully", message: "success" };
        }
        catch (error) {
            console.error("Error deleting supplier:", error);
            return { status: 401, data: `Error: ${error.message || "Unknown error occurred"}`, message: "error" };
        }
    }
}
//# sourceMappingURL=SupplierService.js.map