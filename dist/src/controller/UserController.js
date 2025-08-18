import path from "path";
import { UserService } from "../service/UserService.js";
import { FileUploader } from "../util/FileUploader.js";
export class UserController {
    userService = new UserService();
    async updateUser(imageFile, data) {
        const results = this.userService.updateUser(data, (imageFile || null));
        return results;
    }
    // sdfdsdsfdfdsfdsf
    async login(email, password) {
        return this.userService.login(email, password);
    }
    async setUser(data) {
        return this.userService.createUser(data);
    }
    async getUserById(id) {
        return this.userService.getUserById(id);
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    async getGenderById(id) {
        return this.userService.getGenderById(id);
    }
    async getAllGenders() {
        return this.userService.getAllGenders();
    }
    async getStatusById(id) {
        return this.userService.getStatusById(id);
    }
    async getAllStatuses() {
        return this.userService.getAllStatuses();
    }
    async getUserRoleById(id) {
        return this.userService.getUserRoleById(id);
    }
    async getAllUserRoles() {
        return this.userService.getAllUserRoles();
    }
    async getCityById(id) {
        return this.userService.getCityById(id);
    }
    async getAllCities() {
        return this.userService.getAllCities();
    }
}
//# sourceMappingURL=UserController.js.map