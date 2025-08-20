import { Router } from 'express';
import { UserController } from '../controller/UserController.js';
import { PrismaClient } from '../generated/prisma/index.js';
import { authenticate } from '../middleware/auth.js';
import { FileUploader } from '../util/FileUploader.js';
import path from 'path';
import type { User } from '../types/EntityType.js';

const userRoutes = Router();
const usercontroller = new UserController();
const prisma = new PrismaClient();
const upload = FileUploader.getMulter();

/**
 * @route GET /
 * @description Returns user list (placeholder)
 * @access Protected
 * @response
 *   'User list'
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.get('/', authenticate, (req, res) => {
    res.send('User list');
});

/**
 * @route POST /update-user
 * @description Updates user details including profile image
 * @access Protected
 * @body (multipart/form-data)
 *   - image: File (profile image)
 *   - data: JSON stringified object matching the User type
 * @response
 *   {
 *     "status": 201,
 *     "data": {
 *       "id": 1,
 *       "fname": "John",
 *       "lname": "Doe",
 *       "address": "123 Main St",
 *       "nic": "123456789V",
 *       "email": "john.doe@example.com",
 *       "mobile": "1234567890",
 *       "user_role_id": 2,
 *       "gender_id": 1,
 *       "city_id": 5,
 *       "status_id": 1,
 *       "p_img": null
 *     }
 *   }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.post('/update-user', authenticate, upload.single('image'), async (req, res) => {

    try {
        const imageFile = req.file;

        if (!req.body.data) {
            return res.status(400).json({ error: 'data needs to be provided according to the User format' });
        }

        const data: User = JSON.parse(req.body.data);

        const result = await usercontroller.updateUser((imageFile || null), data);

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @route POST /login
 * @description Authenticates user and returns JWT token
 * @access Public
 * @body
 *   {
 *     "email": "user@example.com",
 *     "password": "password123"
 *   }
 * @response
 *   {
 *     "token": "<JWT token>"
 *   }
 *   If error: { "status": 401, "error": "Invalid email or password" }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await usercontroller.login(email, password);
        if (!token) {
            return res.status(208).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

/**
 * @route POST /set-user
 * @description Creates a new user
 * @access Public
 * @body
 *   {
 *     "fname": "John",
 *     "lname": "Doe",
 *     "address": "123 Main St",
 *     "nic": "123456789V",
 *     "email": "john.doe@example.com",
 *     "password": "securePassword123",
 *     "mobile": "1234567890",
 *     "user_role_id": 2,
 *     "gender_id": 1,
 *     "city_id": 5,
 *     "status_id": 1,
 *     "p_img": null
 *   }
 * @response
 *   {
 *     "status": 201,
 *     "data": {
 *       "id": 1,
 *       "fname": "John",
 *       "lname": "Doe",
 *       "address": "123 Main St",
 *       "nic": "123456789V",
 *       "email": "john.doe@example.com",
 *       "mobile": "1234567890",
 *       "user_role_id": 2,
 *       "gender_id": 1,
 *       "city_id": 5,
 *       "status_id": 1,
 *       "p_img": null
 *     }
 *   }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.post('/set-user', async (req, res) => {
    const userData = req.body;
    try {
        const result = await usercontroller.setUser(userData);
        res.status(201).send(result);
    } catch (error: any) {
        res.status(500).send(error.message || "Internal Server Error");
    }
});

/**
 * @route GET /get-user-by-id/:id
 * @description Gets user by ID
 * @access Protected
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": {
 *       "id": 1,
 *       "fname": "John",
 *       "lname": "Doe",
 *       "address": "123 Main St",
 *       "nic": "123456789V",
 *       "email": "john.doe@example.com",
 *       "mobile": "1234567890",
 *       "user_role_id": 2,
 *       "gender_id": 1,
 *       "city_id": 5,
 *       "status_id": 1,
 *       "p_img": null
 *     }
 *   }
 *   If not found: { "status": 404, "error": "User not found" }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.get('/get-user-by-id/:id', authenticate, async (req, res) => {
    const id = Number(req.params.id);
    try {
        const user = await usercontroller.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

/**
 * @route GET /get-all-users
 * @description Gets paginated users
 * @access Protected
 * @query
 *   - page: number (optional, default 1)
 *   - pageSize: number (optional, default 10)
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "fname": "John",
 *         "lname": "Doe",
 *         "address": "123 Main St",
 *         "nic": "123456789V",
 *         "email": "john.doe@example.com",
 *         "mobile": "1234567890",
 *         "user_role_id": 2,
 *         "gender_id": 1,
 *         "city_id": 5,
 *         "status_id": 1,
 *         "p_img": null
 *       }
 *     ],
 *     "pagination": {
 *       "page": 1,
 *       "pageSize": 10,
 *       "total": 100
 *     }
 *   }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.get('/get-all-users', authenticate, async (req, res) => {
    await usercontroller.getPaginatedUsers(req, res);
});

/**
 * @route GET /get-gender-by-id/:id
 * @description Gets gender by ID
 * @access Public
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": {
 *       "id": 1,
 *       "name": "Male"
 *     }
 *   }
 *   If not found: { "status": 404, "error": "Gender not found" }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.get('/get-gender-by-id/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const gender = await usercontroller.getGenderById(id);
        if (gender) {
            res.status(200).json(gender);
        } else {
            res.status(404).json({ error: 'Gender not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

/**
 * @route GET /get-all-genders
 * @description Gets all genders
 * @access Public
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "name": "Male"
 *       }
 *     ]
 *   }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.get('/get-all-genders', async (req, res) => {
    try {
        const genders = await usercontroller.getAllGenders();
        res.status(200).json(genders);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

/**
 * @route GET /get-status-by-id/:id
 * @description Gets status by ID
 * @access Public
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": {
 *       "id": 1,
 *       "name": "Active"
 *     }
 *   }
 *   If not found: { "status": 404, "error": "Status not found" }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.get('/get-status-by-id/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const status = await usercontroller.getStatusById(id);
        if (status) {
            res.status(200).json(status);
        } else {
            res.status(404).json({ error: 'Status not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

/**
 * @route GET /get-all-statuses
 * @description Gets all statuses
 * @access Public
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "name": "Active"
 *       }
 *     ]
 *   }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.get('/get-all-statuses', async (req, res) => {
    try {
        const statuses = await usercontroller.getAllStatuses();
        res.status(200).json(statuses);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

/**
 * @route GET /get-user-role-by-id/:id
 * @description Gets user role by ID
 * @access Protected
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": {
 *       "id": 1,
 *       "name": "Admin"
 *     }
 *   }
 *   If not found: { "status": 404, "error": "UserRole not found" }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.get('/get-user-role-by-id/:id', authenticate, async (req, res) => {
    const id = Number(req.params.id);
    try {
        const userRole = await usercontroller.getUserRoleById(id);
        if (userRole) {
            res.status(200).json(userRole);
        } else {
            res.status(404).json({ error: 'UserRole not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

/**
 * @route GET /get-all-user-roles
 * @description Gets all user roles
 * @access Protected
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "name": "Admin"
 *       }
 *     ]
 *   }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.get('/get-all-user-roles', authenticate, async (req, res) => {
    try {
        const userRoles = await usercontroller.getAllUserRoles();
        res.status(200).json(userRoles);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

/**
 * @route GET /get-city-by-id/:id
 * @description Gets city by ID
 * @access Public
 * @params
 *   - id: number (required)
 * @response
 *   {
 *     "status": 200,
 *     "data": {
 *       "id": 1,
 *       "name": "Colombo"
 *     }
 *   }
 *   If not found: { "status": 404, "error": "City not found" }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.get('/get-city-by-id/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const city = await usercontroller.getCityById(id);
        if (city) {
            res.status(200).json(city);
        } else {
            res.status(404).json({ error: 'City not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

/**
 * @route GET /get-all-cities
 * @description Gets all cities
 * @access Public
 * @response
 *   {
 *     "status": 200,
 *     "data": [
 *       {
 *         "id": 1,
 *         "name": "Colombo"
 *       }
 *     ]
 *   }
 *   If error: { "status": 500, "message": "Internal server error", "error": "..." }
 */
userRoutes.get('/get-all-cities', async (req, res) => {
    try {
        const cities = await usercontroller.getAllCities();
        res.status(200).json(cities);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

export default userRoutes;