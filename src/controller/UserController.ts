import path from "path";
import { UserService } from "../service/UserService.js";
import type { Response, User } from "../types/EntityType.js";
import { FileUploader } from "../util/FileUploader.js";
import type { UserErr } from "../types/ErrorType.js"; // Make sure to import your error type

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
		const errors: UserErr = {};

		if (!data.fname || typeof data.fname !== "string" || data.fname.trim().length === 0) {
			errors.fname = "First name is required.";
		}

		if (!data.lname || typeof data.lname !== "string" || data.lname.trim().length === 0) {
			errors.lname = "Last name is required.";
		}

		if (!data.address || typeof data.address !== "string" || data.address.trim().length === 0) {
			errors.address = "Address is required.";
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!data.email || !emailRegex.test(data.email)) {
			errors.email = "Valid email is required.";
		}

		if (!data.password || typeof data.password !== "string" || data.password.length < 8) {
			errors.password = "Password must be at least 8 characters.";
		}

		if (typeof data.gender_id !== "number") {
			errors.gender_id = "Gender ID is required and must be a number.";
		}

		if (typeof data.city_id !== "number") {
			errors.city_id = "City ID is required and must be a number.";
		}

		if (!data.nic || typeof data.nic !== "string" || data.nic.trim().length === 0) {
			errors.nic = "NIC is required.";
		}

		const mobileRegex = /^\d{10}$/;
		if (!data.mobile || !mobileRegex.test(data.mobile)) {
			errors.mobile = "Valid mobile number is required.";
		}

		if (Object.keys(errors).length > 0) {
			const response: Response = {
				status: 208,
				message: "Validation failed",
				data: errors
			};
			return response;
		}
		data.status_id = 1;
		data.user_role_id = 4;

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