import { Router } from "express";
import { SupplierController } from "../controller/SupplierController.js";
import { authenticate } from "../middleware/auth.js";
const supplierRoutes = Router();
const supplierController = new SupplierController();
/**
 * @route POST /set-supplier
 * @description Creates a new supplier
 * @access Protected
 *
 * Expected payload:
 * {
 *   fullname: string,
 *   company: string,
 *   address: string,
 *   email: string,
 *   mobile: string
 * }
 *
 * Response:
 *   Supplier created message or validation error
 */
supplierRoutes.post("/set-supplier", authenticate, async (req, res) => {
    const supplierData = req.body;
    try {
        const result = await supplierController.setSupplier(supplierData);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});
/**
 * @route GET /get-supplier-by-id/:id
 * @description Gets supplier by ID
 * @access Protected
 *
 * Params:
 *   id: number
 *
 * Response:
 *   Supplier object or 404 if not found
 */
supplierRoutes.get("/get-supplier-by-id/:id", authenticate, async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await supplierController.getSupplierById(id);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});
/**
 * @route GET /get-all-suppliers
 * @description Gets all suppliers
 * @access Protected
 *
 * Response:
 *   Array of Supplier objects
 */
supplierRoutes.get("/get-all-suppliers", authenticate, async (req, res) => {
    try {
        const result = await supplierController.getAllSuppliers();
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});
/**
 * @route PUT /update-supplier/:id
 * @description Updates supplier details
 * @access Protected
 *
 * Params:
 *   id: number
 * Body:
 *   Partial<Supplier>
 *
 * Response:
 *   Success or error
 */
supplierRoutes.put("/update-supplier/:id", authenticate, async (req, res) => {
    const id = Number(req.params.id);
    const updateData = req.body;
    try {
        const result = await supplierController.updateSupplier(id, updateData);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});
/**
 * @route DELETE /delete-supplier/:id
 * @description Deletes a supplier by ID
 * @access Protected
 *
 * Params:
 *   id: number
 *
 * Response:
 *   Success or error
 */
supplierRoutes.delete("/delete-supplier/:id", authenticate, async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await supplierController.deleteSupplier(id);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});
export default supplierRoutes;
//# sourceMappingURL=SuplierRoute.js.map