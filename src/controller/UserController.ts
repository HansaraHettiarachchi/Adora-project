import { UserService } from "../service/UserService.js";
import type { User } from "../types/EntityType.js";

export class UserController {
	private userService: UserService = new UserService();

	async setUser(data: User): Promise<String> {

		return this.userService.createUser(data);
	}

}