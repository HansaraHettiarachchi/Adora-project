import { jwtDecode } from "jwt-decode";
import type { DecodedUserData } from "../components/types/EntitiesTypes";

export const getTypeFromDay = (days: number): string => {
    if (days === 1) return "day";
    if (days < 7) return `per ${days} days`;
    if (days % 365 === 0) {
        const years = days / 365;
        return years === 1 ? "year" : `${years} years`;
    }
    if (days % 30 === 0) {
        const months = days / 30;
        return months === 1 ? "month" : `${months} months`;
    }
    if (days % 7 === 0) {
        const weeks = days / 7;
        return weeks === 1 ? "week" : `${weeks} weeks`;
    }
    return `per ${days} days`;
}

class AwtUtil {
    static decodeToken(token: string): DecodedUserData | null {
        try {
            const decoded = jwtDecode(token) as {
                sub: string;
                email: string;
                user_role_id: string | number;
                username: string;
                status: string | number;
                exp?: number;
            };

            return {
                userId: decoded.sub,
                email: decoded.email,
                roleId: Number(decoded.user_role_id),
                username: decoded.username,
                status: Number(decoded.status),
                exp: decoded.exp
            };
        } catch (error) {
            console.error("Token decode failed:", error);
            return null;
        }
    }

    static validateToken(token: string | null): boolean {
        if (!token) {
            console.warn("Awt Token is missing");
            return false;
        }
        const data = this.decodeToken(token);
        if (!data) return false;

        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (data.exp && data.exp < currentTimestamp) {
            console.warn("Token has expired");
            return false;
        }

        if (!data.userId || !data.email || !data.roleId || !data.username || data.status == null) {
            console.warn("Token is missing required claims");
            return false;
        }

        return true;
    }
}

export default AwtUtil;
