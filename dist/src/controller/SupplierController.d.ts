import type { Supplier, Response } from "../types/EntityType.js";
export declare class SupplierController {
    private supplierService;
    setSupplier(data: Supplier): Promise<Response>;
    getSupplierById(id: number): Promise<Response>;
    getAllSuppliers(): Promise<Response>;
    updateSupplier(id: number, data: Partial<Supplier>): Promise<Response>;
    deleteSupplier(id: number): Promise<Response>;
}
//# sourceMappingURL=SupplierController.d.ts.map