import type { Supplier, Response } from "../types/EntityType.js";
export declare class SupplierService {
    private prisma;
    createSupplier(supplierData: Supplier): Promise<Response>;
    getSupplierById(supplierId: number): Promise<Response>;
    getAllSuppliers(): Promise<Response>;
    updateSupplier(supplierId: number, updateData: Partial<Supplier>): Promise<Response>;
    deleteSupplier(supplierId: number): Promise<Response>;
}
//# sourceMappingURL=SupplierService.d.ts.map