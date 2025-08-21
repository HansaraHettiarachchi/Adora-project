import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/index.js";
import type { Response, User } from "../types/EntityType.js";
import { generateToken } from "../middleware/auth.js";
import type { UserErr } from "../types/ErrorType.js";
import path from "path";
import { FileUploader } from "../util/FileUploader.js";

export class UserService {

    async login(email: string, password: string): Promise<string | null> {
        const user = await this.prisma.users.findFirst({ where: { email } });
        if (!user) return null;
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        user.password = "Oyata Seethalada..Thanikama Danenawada..?";
        return generateToken(user, '30d');
    }
    private prisma: PrismaClient = new PrismaClient();

    async getUserById(userId: number): Promise<User | null> {
        const user = await this.prisma.users.findUnique({ where: { id: userId } });
        if (!user) return null;
        const { password, ...userWithoutPassword } = user as any;
        return userWithoutPassword as User;
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.users.findMany();
    }

    /**
     * Get paginated users
     */
    async getPaginatedUsers(page: number, pageSize: number): Promise<{ status: number; data: User[]; pagination: { page: number; pageSize: number; total: number } }> {
        const skip = (page - 1) * pageSize;
        const [users, total] = await Promise.all([
            this.prisma.users.findMany({ skip, take: pageSize }),
            this.prisma.users.count()
        ]);
        return {
            status: 200,
            data: users,
            pagination: { page, pageSize, total }
        };
    }

    async createUser(userData: User): Promise<Response> {
        try {
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
                const errors: UserErr = {};
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
                    status: 208,
                    data: errors,
                    message: "error"
                };
            }

            userData.password = await bcrypt.hash(userData.password, 12);
            const { confirmPassword, ...userDataWithoutConfirm } = userData as any;
            await this.prisma.users.create({
                data: userDataWithoutConfirm
            });

            return {
                status: 200,
                data: "User Registered Successfully",
                message: "success"
            };
        } catch (error: any) {
            console.error("Error creating user:", error);
            return {
                status: 401,
                data: `Error: ${error.message || "Unknown error occurred"}`,
                message: "error"
            };
        }
    }

    async updateUser(data: User, imageFile: Express.Multer.File | null): Promise<Response> {
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
                const errors: UserErr = {};
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

            const { password, user_role_id, status_id, confirmPassword, ...updateData } = data as any;

            await this.prisma.users.update({
                where: { id: data.id },
                data: updateData
            });

            return {
                status: 200,
                data: "User Updated Successfully",
                message: "success"
            };
        } catch (error: any) {
            console.error("Error updating user:", error);
            return {
                status: 401,
                data: `Error: ${error.message || "Unknown error occurred"}`,
                message: "error"
            };
        }
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
