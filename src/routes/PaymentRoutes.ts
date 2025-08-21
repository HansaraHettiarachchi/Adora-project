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
 * @description Gets invoice and its items by invoice id, including nested payment method, user, and item details.
 * @access Protected
 *
 * Params:
 *   id: number (required, invoice id)
 *
 * @example Request:
 *   GET /get-all-invoice-data-by-id/1
 *   Headers: { "Authorization": "Bearer <token>" }
 *
 * @example Success Response:
 *   {
 *     "status": 200,
 *     "message": "Invoice fetched successfully",
 *     "data": {
 *       "id": 1,
 *       "total": 1000,
 *       "qty": 5,
 *       "datetime": "2025-08-19T10:00:00.000Z",
 *       "discount": 50,
 *       "payment_method_id": 2,
 *       "users_id": 3,
 *       "payment_method": { "id": 2, "name": "Credit Card" },
 *       "users": { "id": 3, "fname": "John", "lname": "Doe", ... },
 *       "invoice_items": [
 *         {
 *           "id": 10,
 *           "price": 200,
 *           "cost": 150,
 *           "product_id": 5,
 *           "qty": 2,
 *           "batch_id": 7,
 *           "invoice_id": 1,
 *           "product_type_id": 1,
 *           "product_type": { "id": 1, "name": "Plant" }
 *         }
 *       ]
 *     }
 *   }
 *
 * @example Not Found Response:
 *   {
 *     "status": 404,
 *     "message": "Invoice not found",
 *     "data": null
 *   }
 *
 * @example Error Response:
 *   {
 *     "status": 500,
 *     "message": "Internal server error",
 *     "error": "...error details..."
 *   }
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
 * @description Gets all invoices (paginated)
 * @access Protected
 * @query
 *   - page: number (required)
 *   - pageSize: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "total": 1000,
 *         "qty": 5,
 *         "datetime": "2025-08-19T10:00:00.000Z",
 *         "discount": 50,
 *         "payment_method_id": 2,
 *         "users_id": 3,
 *         "invoice_items": [
 *           {
 *             "id": 10,
 *             "price": 200,
 *             "cost": 150,
 *             "product_id": 5,
 *             "qty": 2,
 *             "batch_id": 7,
 *             "invoice_id": 1,
 *             "product_type_id": 1
 *           }
 *         ]
 *       }
 *     ],
 *     "pagination": {
 *       "page": 1,
 *       "pageSize": 10,
 *       "total": 100
 *     }
 *   }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
paymentRoutes.get("/get-all-invoices", authenticate, async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  try {
    const result = await paymentController.getPaginatedInvoices(page, pageSize);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error", error: String(error) });
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