import { PrismaClient } from "../generated/prisma/index.js";
import type { User } from "../types/EntityType.js";

export class UserService {
    private prisma: PrismaClient = new PrismaClient();

    async getUserById(userId: string) {
        return null;
    }

    async createUser(userData: User): Promise<string> {
        try {
            await this.prisma.users.create({
                data: userData
            });
            return "User Registered Successfully";
        } catch (error: any) {
            console.error("Error creating user:", error);
            return `Error: ${error.message || "Unknown error occurred"}`;
        }
    }

    async updateUser(userId: string, updateData: any) {
        return null;
    }

    async deleteUser(userId: string) {
        return null;
    }
}
