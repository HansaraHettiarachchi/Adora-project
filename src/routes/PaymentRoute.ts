import { Router } from "express";
import { PaymentController } from "../controller/PaymentController.js";
import { authenticate } from "../middleware/auth.js";
import type { PaymentMethod } from "../types/EntityType.js";

const paymentRoutes = Router();
const paymentController = new PaymentController();

paymentRoutes.get('/', (req, res) => {
  res.send("Payment routes are working!");
});
/**
 * @route POST /set-payment-method
 * @description Creates a new payment method
 * @access Protected
 *
 * Expected payload:
 * {
 *   name: string
 * }
 *
 * Response:
 *   Payment method created message or validation error
 */
paymentRoutes.post("/set-payment-method", authenticate, async (req, res) => {
  const paymentMethodData: PaymentMethod = req.body;
  try {
    const result = await paymentController.setPaymentMethod(paymentMethodData);
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

/**
 * @route GET /get-payment-method-by-id/:id
 * @description Gets payment method by ID
 * @access Protected
 *
 * Params:
 *   id: number
 *
 * Response:
 *   Payment method object or 404 if not found
 */
paymentRoutes.get("/get-payment-method-by-id/:id", authenticate, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await paymentController.getPaymentMethodById(id);
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

/**
 * @route GET /get-all-payment-methods
 * @description Gets all payment methods
 * @access Protected
 *
 * Response:
 *   Array of Payment Method objects
 */
paymentRoutes.get("/get-all-payment-methods", authenticate, async (req, res) => {
  try {
    const result = await paymentController.getAllPaymentMethods();
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

/**
 * @route POST /set-invoice
 * @description Creates a new invoice and invoice items using batch data
 * @access Protected
 *
 * Expected payload (type: Invoice):
 * {
 *   total: number,
 *   qty: number,
 *   datetime: string,
 *   discount: number,
 *   payment_method_id: number,
 *   users_id: number,
 *   invoice_items: Array<InvoiceItemBatchRef>
 * }
 *
 * Where InvoiceItemBatchRef is:
 * {
 *   batch_id: number, // required, comes from frontend
 *   product_type_id: number, // required (Plant or Pot use 1 as default)
 *   price?: number, // optional, will use batch.price if not provided
 *   cost?: number, // optional, will use batch.cost if not provided
 *   product_id?: number, // optional, will use batch.product_id if not provided
 *   qty?: number // optional, will use batch.qty if not provided
 * }
 *
 * The backend will fetch batch data for each batch_id and fill missing fields for invoice_items.
 *
 * Response:
 *   Invoice created message or validation error
 */
paymentRoutes.post("/set-invoice", authenticate, async (req, res) => {
  try {
    const result = await paymentController.setInvoice(req.body);
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

/**
 * @route GET /get-all-invoice-data-by-id/:id
 * @description Gets invoice and its items by invoice id
 * @access Protected
 *
 * Params:
 *   id: number
 */
paymentRoutes.get("/get-all-invoice-data-by-id/:id", authenticate, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await paymentController.getInvoiceDataById(id);
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

/**
 * @route GET /get-all-invoices
 * @description Gets all invoices
 * @access Protected
 */
paymentRoutes.get("/get-all-invoices", authenticate, async (req, res) => {
  try {
    const result = await paymentController.getAllInvoices();
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

/**
 * @route PUT /update-payment-method/:id
 * @description Updates payment method details
 * @access Protected
 *
 * Params:
 *   id: number
 * Body:
 *   Partial<PaymentMethod>
 *
 * Response:
 *   Success or error
 */
paymentRoutes.put("/update-payment-method/:id", authenticate, async (req, res) => {
  const id = Number(req.params.id);
  const updateData: Partial<PaymentMethod> = req.body;
  try {
    const result = await paymentController.updatePaymentMethod(id, updateData);
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

/**
 * @route DELETE /delete-payment-method/:id
 * @description Deletes a payment method by ID
 * @access Protected
 *
 * Params:
 *   id: number
 *
 * Response:
 *   Success or error
 */
paymentRoutes.delete("/delete-payment-method/:id", authenticate, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await paymentController.deletePaymentMethod(id);
    res.status(result.status).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

export default paymentRoutes;