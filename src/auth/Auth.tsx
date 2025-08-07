import { useEffect, useState } from "react";
import AwtUtil from "../util/AwtUtil";
import type { AuthProps } from "../types/EntitiesTypes";
import { Container } from "react-bootstrap";

const Auth = ({ children }: AuthProps) => {
    const [auth, setAuth] = useState<boolean>(false);

    useEffect(() => {
        setAuth(AwtUtil.validateToken(localStorage.getItem("jwtToken")));
    }, []);

    const afterSignUp = () => {
        setAuth(AwtUtil.validateToken(localStorage.getItem("jwtToken")));
    }

    return (
        <>
            {/* {auth ? children : <SignModal show={!auth} afterSignUp={afterSignUp} />} */}

            <Container>
                <h5>You need to Sign in</h5>
            </Container>

        </>
    );
}

export default Auth;