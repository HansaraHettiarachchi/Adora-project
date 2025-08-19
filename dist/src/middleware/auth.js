import { PrismaClient } from '../generated/prisma/index.js';
import jwt, {} from 'jsonwebtoken';
const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET;
export const authenticate = async (req, res, next) => {
    if (!SECRET) {
        return res.status(500).json({ error: 'JWT secret not configured' });
    }
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        const user = await prisma.users.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
export function generateToken(payload, expiresIn = '1h') {
    if (!SECRET) {
        throw new Error('JWT secret not configured');
    }
    const options = { expiresIn };
    return jwt.sign(payload, SECRET, options);
}
//# sourceMappingURL=auth.js.map