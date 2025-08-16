import { PrismaClient } from '../generated/prisma/index.js';
import jwt, { type SignOptions } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET;

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    if (!SECRET) {
        return res.status(500).json({ error: 'JWT secret not configured' });
    }

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, SECRET) as { userId: number };
        const user = await prisma.users.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export function generateToken(payload: object, expiresIn: jwt.SignOptions['expiresIn'] = '1h'): string {
    if (!SECRET) {
        throw new Error('JWT secret not configured');
    }

    const options: SignOptions = { expiresIn };
    return jwt.sign(payload, SECRET, options);
}
