import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { UserService } from '../service/UserService.js';
import { UserController } from '../controller/UserController.js';

const userRoutes = Router();
const usercontroller = new UserController();

userRoutes.get('/', authenticate, (req, res) => {
    res.send('User list');
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


userRoutes.get('/:id', (req, res) => {
    res.send(`User details for ID: ${req.params.id}`);
});

export default userRoutes;