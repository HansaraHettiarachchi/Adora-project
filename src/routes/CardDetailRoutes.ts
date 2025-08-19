import { Router } from "express";
import { CardDetailController } from "../controller/CardDetailController.js";
import { authenticate } from "../middleware/auth.js";
import type { CardDetail } from "../controller/CardDetailController.js";

const cardDetailRoutes = Router();
const cardDetailController = new CardDetailController();

/**
 * @route POST /set-card-detail
 * @description Creates a new card detail
 * @access Protected
 */
cardDetailRoutes.post("/set-card-detail", authenticate, async (req, res) => {
    const cardDetailData: CardDetail = req.body;
    try {
        const result = await cardDetailController.setCardDetailMethod(cardDetailData);
        res.status(result.status).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

/**
 * @route GET /get-card-detail-by-id/:id
 * @description Gets card detail by ID
 * @access Protected
 */
cardDetailRoutes.get("/get-card-detail-by-id/:id", authenticate, async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await cardDetailController.getCardDetailMethodById(id);
        res.status(result.status).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

/**
 * @route DELETE /delete-card-detail/:id
 * @description Deletes a card detail by ID
 * @access Protected
 */
cardDetailRoutes.delete("/delete-card-detail/:id", authenticate, async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await cardDetailController.deleteCardDetailMethod(id);
        res.status(result.status).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

export default cardDetailRoutes;
