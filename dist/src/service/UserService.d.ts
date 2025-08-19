import type { Response, User } from "../types/EntityType.js";
export declare class UserService {
    login(email: string, password: string): Promise<string | null>;
    private prisma;
    getUserById(userId: number): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
    createUser(userData: User): Promise<Response>;
    updateUser(data: User, imageFile: Express.Multer.File | null): Promise<Response>;
    deleteUser(userId: string): Promise<null>;
    getGenderById(id: number): Promise<{
        id: number;
        name: string;
    } | null>;
    getAllGenders(): Promise<{
        id: number;
        name: string;
    }[]>;
    getStatusById(id: number): Promise<{
        id: number;
        name: string;
    } | null>;
    getAllStatuses(): Promise<{
        id: number;
        name: string;
    }[]>;
    getUserRoleById(id: number): Promise<{
        id: number;
        name: string;
    } | null>;
    getAllUserRoles(): Promise<{
        id: number;
        name: string;
    }[]>;
    getCityById(id: number): Promise<{
        id: number;
        name: string;
    } | null>;
    getAllCities(): Promise<{
        id: number;
        name: string;
    }[]>;
}
//# sourceMappingURL=UserService.d.ts.map