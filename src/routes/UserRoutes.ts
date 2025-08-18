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
 * @returns {string} 'User list'
 */
userRoutes.get('/', authenticate, (req, res) => {
    res.send('User list');
});

/**
 * @route POST /update-user
 * @description Updates user details including profile image
 * @access Protected
 *
 * Expected multipart/form-data payload:
 * - image: File (profile image)
 * - data: JSON stringified object matching the User type
 *
 * Example:
 * FormData {
 *   image: <File>,
 *   data: JSON.stringify({
 *     id: 1,
 *     fname: "John",
 *     lname: "Doe",
 *     address: "123 Main St",
 *     nic: "123456789V",
 *     email: "john.doe@example.com",
 *     password: "securePassword123",
 *     mobile: "1234567890",
 *     user_role_id: 2,
 *     gender_id: 1,
 *     city_id: 5,
 *     status_id: 1,
 *     p_img: null
 *   })
 * }
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
 *
 * Expected payload:
 * {
 *   email: string,
 *   password: string
 * }
 *
 * Response:
 * {
 *   token: string
 * }
 */
userRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await usercontroller.login(email, password);
        if (!token) {
            return res.status(401).json({ error: 'Invalid email or password' });
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
 *
 * Expected payload:
 * {
 *   fname: string,
 *   lname: string,
 *   address: string,
 *   nic: string,
 *   email: string,
 *   password: string,
 *   mobile: string,
 *   user_role_id: number,
 *   gender_id: number,
 *   city_id: number,
 *   status_id: number,
 *   p_img: string | null
 * }
 *
 * Response:
 *   User object
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
 *
 * Params:
 *   id: number
 *
 * Response:
 *   User object or 404 if not found
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
 * @description Gets all users
 * @access Protected
 *
 * Response:
 *   Array of User objects
 */
userRoutes.get('/get-all-users', authenticate, async (req, res) => {
    try {
        const users = await usercontroller.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

/**
 * @route GET /get-gender-by-id/:id
 * @description Gets gender by ID
 * @access Public
 *
 * Params:
 *   id: number
 *
 * Response:
 *   Gender object or 404 if not found
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
 *
 * Response:
 *   Array of Gender objects
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
 *
 * Params:
 *   id: number
 *
 * Response:
 *   Status object or 404 if not found
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
 *
 * Response:
 *   Array of Status objects
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
 *
 * Params:
 *   id: number
 *
 * Response:
 *   UserRole object or 404 if not found
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
 *
 * Response:
 *   Array of UserRole objects
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
 *
 * Params:
 *   id: number
 *
 * Response:
 *   City object or 404 if not found
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
 *
 * Response:
 *   Array of City objects
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