import type { Response, User } from "../types/EntityType.js";
export declare class UserController {
    private userService;
    updateUser(imageFile: Express.Multer.File | null, data: User): Promise<Response>;
    login(email: string, password: string): Promise<string | null>;
    setUser(data: User): Promise<Response>;
    getUserById(id: number): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
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
//# sourceMappingURL=UserController.d.ts.map