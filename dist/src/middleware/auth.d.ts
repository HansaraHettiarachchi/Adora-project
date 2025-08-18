import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare function generateToken(payload: object, expiresIn?: jwt.SignOptions['expiresIn']): string;
//# sourceMappingURL=auth.d.ts.map