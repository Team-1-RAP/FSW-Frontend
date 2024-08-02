import React, { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

export interface AuthContextProps {
    token: string | null;
    setToken: (token: string | null) => void;
    fullname: string | null;
    isAuthenticated: boolean;
    logout: () => void;
}

export interface DecodedToken {
    full_name: string;
    exp: number;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(sessionStorage.getItem("token"));
    const [fullname, setFullname] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const decodeToken = useCallback((token: string) => {
        const decoded: DecodedToken = jwtDecode(token);
        setFullname(decoded.full_name);
        console.log(decoded);
        return decoded.exp;
    }, []);

    const handleSetToken = useCallback(
        (token: string | null) => {
            if (token) {
                sessionStorage.setItem("token", token);
                const expiryTime = decodeToken(token);
                const currentTime = Date.now() / 1000;
                setIsAuthenticated(expiryTime > currentTime);
            } else {
                sessionStorage.removeItem("token");
                setIsAuthenticated(false);
            }
            setToken(token);
        },
        [decodeToken]
    );

    const logout = useCallback(() => {
        sessionStorage.removeItem("token");
        localStorage.removeItem("activeSession");
        setToken(null);
        setFullname(null);
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
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

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken: handleSetToken,
                fullname,
                isAuthenticated,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
