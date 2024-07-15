import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
    token: string | null;
    setToken: (token: string | null) => void;
    fullname: string | null;
    isAuthenticated: boolean;
    logout: () => void;
}

interface DecodedToken {
    full_name: string;
    exp: number;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [fullname, setFullname] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const decodeToken = useCallback((token: string) => {
        const decoded: DecodedToken = jwtDecode(token);
        setFullname(decoded.full_name);
        return decoded.exp;
    }, []);

    const handleSetToken = useCallback(
        (token: string | null) => {
            if (token) {
                localStorage.setItem("token", token);
                const expiryTime = decodeToken(token);
                const currentTime = Date.now() / 1000;
                setIsAuthenticated(expiryTime > currentTime);
            } else {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
            }
            setToken(token);
        },
        [decodeToken]
    );

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        setFullname(null);
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const expiryTime = decodeToken(token);
                const currentTime = Date.now() / 1000;
                setIsAuthenticated(expiryTime > currentTime);
            } catch (error) {
                console.error("Error decoding token:", error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [decodeToken]);

    return <AuthContext.Provider value={{ token, setToken: handleSetToken, fullname, isAuthenticated, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
