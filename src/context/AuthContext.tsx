import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
    token: string | null;
    setToken: (token: string | null) => void;
    fullname: string | null;
    isTokenExpired: () => boolean;
    logout: () => void;
}

interface DecodedToken {
    user_name: string;
    exp: number;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [fullname, setFullname] = useState<string | null>(null);

    const decodeToken = useCallback(() => {
        if (token) {
            const decoded: DecodedToken = jwtDecode(token);
            setFullname(decoded.user_name);
            console.log(decoded);
        }
    }, [token]);

    const handleSetToken = (token: string | null) => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
        setToken(token);
    };

    const isTokenExpired = useCallback(() => {
        if (token) {
            const decoded: DecodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        }
        return true;
    }, [token]);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        setFullname(null);
    }, []);

    useEffect(() => {
        decodeToken();
    }, [decodeToken]);

    return <AuthContext.Provider value={{ token, setToken: handleSetToken, fullname, isTokenExpired, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
