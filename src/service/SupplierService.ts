// import { PrismaClient } from "../generated/prisma/index.js";
// import type { Supplier } from "../types/EntityType.js";

// export class SupplierService {
//     private prisma: PrismaClient = new PrismaClient();

//     // Create Supplier
//     async createSupplier(supplierData: Supplier): Promise<Response> {
//         try {
//             await this.prisma.supplier.create({
//                 data: supplierData
//             });
//             return "Supplier Registered Successfully";
//         } catch (error: any) {
//             console.error("Error creating supplier:", error);
//             return `Error: ${error.message || "Unknown error occurred"}`;
//         }
//     }

//     // Get Supplier by ID (without include)
//     async getSupplierById(supplierId: number): Promise<Supplier | null> {
//         return this.prisma.supplier.findUnique({ 
//             where: { id: supplierId }
//         });
//     }

//     // Get All Suppliers (without include)
//     async getAllSuppliers(): Promise<Supplier[]> {
//         return this.prisma.supplier.findMany();
//     }

//     // Update Supplier
//     async updateSupplier(supplierId: number, updateData: Partial<Supplier>): Promise<Supplier | null> {
//         try {
//             return await this.prisma.supplier.update({
//                 where: { id: supplierId },
//                 data: updateData
//             });
//         } catch (error: any) {
//             console.error("Error updating supplier:", error);
//             return null;
//         }
//     }

//     // Delete Supplier
//     async deleteSupplier(supplierId: number): Promise<string> {
//         try {
//             await this.prisma.supplier.delete({
//                 where: { id: supplierId }
//             });
//             return "Supplier Deleted Successfully";
//         } catch (error: any) {
//             console.error("Error deleting supplier:", error);
//             return `Error: ${error.message || "Unknown error occurred"}`;
//         }
//     }
// }
