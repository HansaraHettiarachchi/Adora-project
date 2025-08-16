import { Router } from 'express';
import { UserController } from '../controller/UserController.js';
import { PrismaClient } from '../generated/prisma/index.js';
import { authenticate } from '../middleware/auth.js';

const userRoutes = Router();
const usercontroller = new UserController();
const prisma = new PrismaClient();

userRoutes.get('/', authenticate, (req, res) => {
    res.send('User list');
});

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

userRoutes.post('/set-user', async (req, res) => {
    const userData = req.body;
    try {
        const result = await usercontroller.setUser(userData);
        res.status(201).send(result);
    } catch (error: any) {
        res.status(500).send(error.message || "Internal Server Error");
    }
});

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

userRoutes.get('/get-all-users', authenticate, async (req, res) => {
    try {
        const users = await usercontroller.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

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

userRoutes.get('/get-all-genders', async (req, res) => {
    try {
        const genders = await usercontroller.getAllGenders();
        res.status(200).json(genders);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

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

userRoutes.get('/get-all-statuses', async (req, res) => {
    try {
        const statuses = await usercontroller.getAllStatuses();
        res.status(200).json(statuses);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

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

userRoutes.get('/get-all-user-roles', authenticate, async (req, res) => {
    try {
        const userRoles = await usercontroller.getAllUserRoles();
        res.status(200).json(userRoles);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

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

userRoutes.get('/get-all-cities', async (req, res) => {
    try {
        const cities = await usercontroller.getAllCities();
        res.status(200).json(cities);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

export default userRoutes;