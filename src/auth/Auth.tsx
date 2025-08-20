import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JwtUtil from "../util/JwtUtil";
import type { AuthProps } from "../types/EntitiesTypes";

const Auth = ({ children }: AuthProps) => {
    const [auth, setAuth] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isValid = JwtUtil.validateToken(localStorage.getItem("jwtToken"));
        
        setAuth(isValid);
        if (!isValid) {
            navigate("/login");
        }
    }, [navigate]);

    const afterSignUp = () => {
        const isValid = JwtUtil.validateToken(localStorage.getItem("jwtToken"));
        setAuth(isValid);
        if (!isValid) {
            navigate("/login");
        }
    };

    return (
        <>
            {auth && children}
        </>
    );
}

export default Auth;