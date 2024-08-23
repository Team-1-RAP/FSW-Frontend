import { createContext } from "react";
import { Outlet } from "react-router-dom";

export interface RegisterContextProps {
    registerProfile: (
        email: string,
        username: string,
        password: string,
        confirmPassword: string
    ) => Promise<void>;
}

export const RegisterContext = createContext<RegisterContextProps | null>(null);

export const RegisterProvider = () => {
    const registerProfile = async (
        email: string,
        username: string,
        password: string,
        confirmPassword: string
    ) => {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION +
                    "registration/customer/profile",
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        username,
                        password,
                        confirmPassword,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error registering profile");
            }
        } catch (error) {
            console.error("Error registering profile:", error);
            throw error;
        }
    };

    const contextValue = {
        registerProfile,
    };

    return (
        <RegisterContext.Provider value={contextValue}>
            <Outlet />
        </RegisterContext.Provider>
    );
};
