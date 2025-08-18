import { SupplierService } from "../service/SupplierService.js";
export class SupplierController {
    supplierService = new SupplierService();
    async setSupplier(data) {
        return this.supplierService.createSupplier(data);
    }
    async getSupplierById(id) {
        return this.supplierService.getSupplierById(id);
    }
    async getAllSuppliers() {
        return this.supplierService.getAllSuppliers();
    }
    async updateSupplier(id, data) {
        return this.supplierService.updateSupplier(id, data);
    }
    async deleteSupplier(id) {
        return this.supplierService.deleteSupplier(id);
    }
}
//# sourceMappingURL=SupplierController.js.map