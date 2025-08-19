import { Router } from "express";
import { SupplierController } from "../controller/SupplierController.js";
import { authenticate } from "../middleware/auth.js";
import type { Supplier } from "../types/EntityType.js";

const supplierRoutes = Router();
const supplierController = new SupplierController();

/**
 * @route POST /set-supplier
 * @description Creates a new supplier
 * @access Protected
 * @body
 *   {
 *     "fullname": "John Smith",
 *     "company": "Acme Inc.",
 *     "address": "123 Main St",
 *     "email": "john.smith@acme.com",
 *     "mobile": "1234567890"
 *   }
 * @response
 *   {
 *     "status": 201,
 *     "data": {
 *       "id": 1,
 *       "fullname": "John Smith",
 *       "company": "Acme Inc.",
 *       "address": "123 Main St",
 *       "email": "john.smith@acme.com",
 *       "mobile": "1234567890"
 *     }
 *   }
 *   If validation error: { "status": 400, "error": "Missing required fields" }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
supplierRoutes.post("/set-supplier", authenticate, async (req, res) => {
  const supplierData: Supplier = req.body;
  try {
    const result = await supplierController.setSupplier(supplierData);
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

/**
 * @route GET /get-supplier-by-id/:id
 * @description Gets supplier by ID
 * @access Protected
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": {
 *       "id": 1,
 *       "fullname": "John Smith",
 *       "company": "Acme Inc.",
 *       "address": "123 Main St",
 *       "email": "john.smith@acme.com",
 *       "mobile": "1234567890"
 *     }
 *   }
 *   If not found: { "status": 404, "error": "Supplier not found" }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
supplierRoutes.get("/get-supplier-by-id/:id", authenticate, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await supplierController.getSupplierById(id);
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

/**
 * @route GET /get-all-suppliers
 * @description Gets all suppliers
 * @access Protected
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "fullname": "John Smith",
 *         "company": "Acme Inc.",
 *         "address": "123 Main St",
 *         "email": "john.smith@acme.com",
 *         "mobile": "1234567890"
 *       }
 *     ]
 *   }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
supplierRoutes.get("/get-all-suppliers", authenticate, async (req, res) => {
  try {
    const result = await supplierController.getAllSuppliers();
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

/**
 * @route PUT /update-supplier/:id
 * @description Updates supplier details
 * @access Protected
 * @params
 *   - id: number (required)
 * @body
 *   Partial<Supplier> (any subset of supplier fields)
 * @response
 *   {
 *     "status": 200,
 *     "data": {
 *       "id": 1,
 *       "fullname": "John Smith",
 *       "company": "Acme Inc.",
 *       "address": "123 Main St",
 *       "email": "john.smith@acme.com",
 *       "mobile": "1234567890"
 *     }
 *   }
 *   If not found: { "status": 404, "error": "Supplier not found" }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
supplierRoutes.put("/update-supplier/:id", authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const updateData: Partial<Supplier> = req.body;
  try {
    const result = await supplierController.updateSupplier(id, updateData);
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

/**
 * @route DELETE /delete-supplier/:id
 * @description Deletes a supplier by ID
 * @access Protected
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "message": "Supplier deleted successfully"
 *   }
 *   If not found: { "status": 404, "error": "Supplier not found" }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
supplierRoutes.delete("/delete-supplier/:id", authenticate, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await supplierController.deleteSupplier(id);
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

export default supplierRoutes;
