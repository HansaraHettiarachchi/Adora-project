import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/index.js";
import type { User } from "../types/EntityType.js";
import { generateToken } from "../middleware/auth.js";

export class UserService {

    async login(email: string, password: string): Promise<string | null> {
        const user = await this.prisma.users.findFirst({ where: { email } });
        if (!user) return null;
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        return generateToken(user);
    }
    private prisma: PrismaClient = new PrismaClient();

    async getUserById(userId: number): Promise<User | null> {
        return this.prisma.users.findUnique({ where: { id: userId } });
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.users.findMany();
    }

    async createUser(userData: User): Promise<string> {
        try {

            userData.password = await bcrypt.hash(userData.password, 12);

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

    // Gender
    async getGenderById(id: number) {
        return this.prisma.gender.findUnique({ where: { id } });
    }

    async getAllGenders() {
        return this.prisma.gender.findMany();
    }

    // Status
    async getStatusById(id: number) {
        return this.prisma.status.findUnique({ where: { id } });
    }

    async getAllStatuses() {
        return this.prisma.status.findMany();
    }

    // UserRole
    async getUserRoleById(id: number) {
        return this.prisma.user_role.findUnique({ where: { id } });
    }

    async getAllUserRoles() {
        return this.prisma.user_role.findMany();
    }

    // City
    async getCityById(id: number) {
        return this.prisma.city.findUnique({ where: { id } });
    }

    async getAllCities() {
        return this.prisma.city.findMany();
    }
    // ...existing code...
}
