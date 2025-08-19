import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/index.js";
import { generateToken } from "../middleware/auth.js";
import path from "path";
import { FileUploader } from "../util/FileUploader.js";
export class UserService {
    async login(email, password) {
        const user = await this.prisma.users.findFirst({ where: { email } });
        if (!user)
            return null;
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return null;
        return generateToken(user, '30d');
    }
    prisma = new PrismaClient();
    async getUserById(userId) {
        return this.prisma.users.findUnique({ where: { id: userId } });
    }
    async getAllUsers() {
        return this.prisma.users.findMany();
    }
    async createUser(userData) {
        try {
            // Check for existing user by email, mobile, or NIC (if provided)
            const existingUser = await this.prisma.users.findFirst({
                where: {
                    OR: [
                        { email: userData.email },
                        { mobile: userData.mobile },
                        ...(userData.nic ? [{ nic: userData.nic }] : [])
                    ]
                }
            });
            if (existingUser) {
                const errors = {};
                if (existingUser.email === userData.email) {
                    errors.email = "User with this email already exists";
                }
                if (existingUser.mobile === userData.mobile) {
                    errors.mobile = "User with this mobile already exists";
                }
                if (userData.nic && existingUser.nic === userData.nic) {
                    errors.nic = "User with this NIC already exists";
                }
                return {
                    status: 409,
                    data: errors,
                    message: "error"
                };
            }
            userData.password = await bcrypt.hash(userData.password, 12);
            await this.prisma.users.create({
                data: userData
            });
            return {
                status: 200,
                data: "User Registered Successfully",
                message: "success"
            };
        }
        catch (error) {
            console.error("Error creating user:", error);
            return {
                status: 401,
                data: `Error: ${error.message || "Unknown error occurred"}`,
                message: "error"
            };
        }
    }
    async updateUser(data, imageFile) {
        try {
            const existingUser = await this.prisma.users.findFirst({
                where: {
                    OR: [
                        { email: data.email },
                        { mobile: data.mobile },
                        ...(data.nic ? [{ nic: data.nic }] : [])
                    ],
                    NOT: { id: data.id }
                }
            });
            if (existingUser) {
                const errors = {};
                if (existingUser.email === data.email) {
                    errors.email = "User with this email already exists";
                }
                if (existingUser.mobile === data.mobile) {
                    errors.mobile = "User with this mobile already exists";
                }
                if (data.nic && existingUser.nic === data.nic) {
                    errors.nic = "User with this NIC already exists";
                }
                return {
                    status: 409,
                    data: errors,
                    message: "error"
                };
            }
            const currentUser = await this.prisma.users.findUnique({ where: { id: data.id } });
            if (!currentUser) {
                return {
                    status: 404,
                    data: "User not found",
                    message: "error"
                };
            }
            if (imageFile) {
                const ext = path.extname(imageFile.originalname);
                const uniqueName = currentUser.p_img || `users/${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;
                await FileUploader.uploadFile(imageFile, uniqueName);
                data.p_img = uniqueName;
            }
            data.password = await bcrypt.hash(data.password, 12);
            await this.prisma.users.update({
                where: { id: data.id },
                data: data
            });
            return {
                status: 200,
                data: "User Updated Successfully",
                message: "success"
            };
        }
        catch (error) {
            console.error("Error updating user:", error);
            return {
                status: 401,
                data: `Error: ${error.message || "Unknown error occurred"}`,
                message: "error"
            };
        }
    }
    async deleteUser(userId) {
        return null;
    }
    // Gender
    async getGenderById(id) {
        return this.prisma.gender.findUnique({ where: { id } });
    }
    async getAllGenders() {
        return this.prisma.gender.findMany();
    }
    // Status
    async getStatusById(id) {
        return this.prisma.status.findUnique({ where: { id } });
    }
    async getAllStatuses() {
        return this.prisma.status.findMany();
    }
    // UserRole
    async getUserRoleById(id) {
        return this.prisma.user_role.findUnique({ where: { id } });
    }
    async getAllUserRoles() {
        return this.prisma.user_role.findMany();
    }
    // City
    async getCityById(id) {
        return this.prisma.city.findUnique({ where: { id } });
    }
    async getAllCities() {
        return this.prisma.city.findMany();
    }
}
//# sourceMappingURL=UserService.js.map