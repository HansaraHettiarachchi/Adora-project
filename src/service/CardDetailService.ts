import { PrismaClient } from "../generated/prisma/index.js";
import type { Response } from "../types/EntityType.js";
import type { CardDetail } from "../controller/CardDetailController.js";
import type { CardDetailErr } from "../types/ErrorType.js";

export class CardDetailService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createCardDetail(data: CardDetail): Promise<Response> {
        try {
            // Validation
            const errors: CardDetailErr = {};

            if (!data.card_no) {
                errors.card_no = "Card number is required";
            } else if (data.card_no.toString().length < 12 || data.card_no.toString().length > 19) {
                errors.card_no = "Card number must be between 12 and 19 digits";
            }

            if (!data.payment_method_id) {
                errors.payment_method_id = "Payment method ID is required";
            }

            if (data.cvv !== undefined && data.cvv !== null) {
                if (!/^\d{3}$/.test(data.cvv.toString())) {
                    errors.cvv = "CVV must be a 3-digit number";
                }
            }

            if (data.exp) {
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.exp)) {
                    errors.exp = "Expiration date must be in MM/YY format";
                }
            }

            if (Object.keys(errors).length > 0) {
                return { status: 400, message: "Validation failed", data: errors };
            }

            const paymentMethod = await this.prisma.payment_method.findUnique({
                where: { id: data.payment_method_id },
            });
            if (!paymentMethod) {
                return { status: 404, message: "Payment method not found", data: null };
            }

            const cardDetail = await this.prisma.card_details.create({
                data: {
                    card_no: data.card_no,
                    payment_method_id: data.payment_method_id,
                    cvv: data.cvv ?? null,
                    exp: data.exp ?? null,
                },
            });

            return {
                status: 201,
                message: "Card detail created successfully",
                data: cardDetail,
            };
        } catch (error: any) {
            throw new Error(`Failed to create card detail: ${error.message}`);
        }
    }

    async getCardDetailById(id: number): Promise<Response> {
        try {
            if (!Number.isInteger(id) || id <= 0) {
                return { status: 400, message: "Invalid card detail ID", data: null };
            }

            const cardDetail = await this.prisma.card_details.findUnique({
                where: { id },
            });

            if (!cardDetail) {
                return { status: 404, message: "Card detail not found", data: null };
            }

            return {
                status: 200,
                message: "Card detail retrieved successfully",
                data: cardDetail,
            };
        } catch (error: any) {
            throw new Error(`Failed to retrieve card detail: ${error.message}`);
        }
    }

    async deleteCardDetail(id: number): Promise<Response> {
        try {
            if (!Number.isInteger(id) || id <= 0) {
                return { status: 400, message: "Invalid card detail ID", data: null };
            }

            const existing = await this.prisma.card_details.findUnique({
                where: { id },
            });

            if (!existing) {
                return { status: 404, message: "Card detail not found", data: null };
            }

            await this.prisma.card_details.delete({ where: { id } });

            return {
                status: 200,
                message: "Card detail deleted successfully",
                data: null,
            };
        } catch (error: any) {
            throw new Error(`Failed to delete card detail: ${error.message}`);
        }
    }
}
