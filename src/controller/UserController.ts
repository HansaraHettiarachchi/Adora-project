import path from "path";
import { UserService } from "../service/UserService.js";
import type { Response, User } from "../types/EntityType.js";
import { FileUploader } from "../util/FileUploader.js";

export class UserController {
	private userService: UserService = new UserService();

	async updateUser(imageFile: Express.Multer.File | null, data: User): Promise<Response> {

		const results = this.userService.updateUser(data, (imageFile || null));
		return results;
	}
	// sdfdsdsfdfdsfdsf
	async login(email: string, password: string) {
		return this.userService.login(email, password);
	}

	async setUser(data: User): Promise<Response> {

		return this.userService.createUser(data);
	}

	async getUserById(id: number) {
		return this.userService.getUserById(id);
	}

	async getAllUsers() {
		return this.userService.getAllUsers();
	}

	/**
	 * Get paginated users
	 */
	async getPaginatedUsers(req: any, res: any) {
		const page = Number(req.query.page) || 1;
		const pageSize = Number(req.query.pageSize) || 10;
		try {
			const result = await this.userService.getPaginatedUsers(page, pageSize);
			return res.status(200).json(result);
		} catch (error: any) {
			return res.status(500).json({ status: 500, message: 'Internal server error', error: error.message || String(error) });
		}
	}

	async getGenderById(id: number) {
		return this.userService.getGenderById(id);
	}

	async getAllGenders() {
		return this.userService.getAllGenders();
	}

	async getStatusById(id: number) {
		return this.userService.getStatusById(id);
	}

	async getAllStatuses() {
		return this.userService.getAllStatuses();
	}

	async getUserRoleById(id: number) {
		return this.userService.getUserRoleById(id);
	}

	async getAllUserRoles() {
		return this.userService.getAllUserRoles();
	}

	async getCityById(id: number) {
		return this.userService.getCityById(id);
	}

	async getAllCities() {
		return this.userService.getAllCities();
	}
}