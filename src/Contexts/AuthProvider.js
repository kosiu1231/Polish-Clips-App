import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [auth, setAuth] = useState(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setIsLogged(true);
            return parsedUser;
        } else {
            setIsLogged(false);
            return {};
        }
    });
    const date = new Date();
    const navigate = useNavigate();

    // eslint-disable-next-line
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.expiresAt > date.getTime()) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        } else {
            setIsLogged(false);
        }
    });

    const Logout = () => {
        localStorage.clear();
        setAuth({});
        navigate("/");
    };

    return (
        <AuthContext.Provider
            value={{ auth, setAuth, Logout, isLogged, setIsLogged }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
