import { UserService } from "../service/UserService.js";
import type { User } from "../types/EntityType.js";

export class UserController {

	async login(email: string, password: string) {
		return this.userService.login(email, password);
	}
	private userService: UserService = new UserService();

	async setUser(data: User): Promise<String> {

		return this.userService.createUser(data);
	}

	async getUserById(id: number) {
		return this.userService.getUserById(id);
	}

	async getAllUsers() {
		return this.userService.getAllUsers();
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