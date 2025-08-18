import { SupplierService } from "../service/SupplierService.js";
import type { Supplier, Response } from "../types/EntityType.js";

export class SupplierController {
    private supplierService: SupplierService = new SupplierService();

    async setSupplier(data: Supplier): Promise<Response> {
        return this.supplierService.createSupplier(data);
    }

    async getSupplierById(id: number): Promise<Response> {
        return this.supplierService.getSupplierById(id);
    }

    async getAllSuppliers(): Promise<Response> {
        return this.supplierService.getAllSuppliers();
    }

    async updateSupplier(id: number, data: Partial<Supplier>): Promise<Response> {
        return this.supplierService.updateSupplier(id, data);
    }

    async deleteSupplier(id: number): Promise<Response> {
        return this.supplierService.deleteSupplier(id);
    }
}
