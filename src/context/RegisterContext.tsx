import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { registerProfile as registerProfileService } from "../services/registerService";

export interface RegisterContextProps {
    registerProfile: (email: string, username: string, password: string, confirmPassword: string) => Promise<void>;
    username: string | null;
    email: string | null;
    otp: string | null;
    accountTypeId: number | null;
    setAccountTypeId: (type: number) => void;
    fullname: string | null;
    nik: string | null;
    born_date: string | null;
    address: string | null;
    accountPurpose_id: number | null;
    setFullname: (fullname: string | null) => void;
    setNik: (nik: string | null) => void;
    setBornDate: (born_date: string | null) => void;
    setAddress: (address: string | null) => void;
    setAccountPurposeId: (id: number | null) => void; // Add setter function for accountPurpose_id
}

// Create the context with null default value
export const RegisterContext = createContext<RegisterContextProps | null>(null);

export const RegisterProvider: React.FC = () => {
    // State hooks for context properties
    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [otp, setOtp] = useState<string | null>(null);
    const [accountTypeId, setAccountTypeId] = useState<number | null>(null);
    const [fullname, setFullname] = useState<string | null>(null);
    const [nik, setNik] = useState<string | null>(null);
    const [born_date, setBornDate] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [accountPurpose_id, setAccountPurposeId] = useState<number | null>(null); // Add state for accountPurpose_id

    // Function to register profile
    const registerProfile = async (email: string, username: string, password: string, confirmPassword: string) => {
        try {
            const { username: registeredUsername, email: registeredEmail, otp: registeredOtp } = await registerProfileService(email, username, password, confirmPassword);
            setUsername(registeredUsername);
            setEmail(registeredEmail);
            setOtp(registeredOtp);
        } catch (error) {
            console.error("Error registering profile:", error);
            throw error;
        }
    };

    return (
        <RegisterContext.Provider
            value={{
                username,
                email,
                otp,
                accountTypeId,
                setAccountTypeId,
                fullname,
                nik,
                born_date,
                address,
                accountPurpose_id,
                setFullname,
                setNik,
                setBornDate,
                setAddress,
                setAccountPurposeId, // Provide setter for accountPurpose_id
                registerProfile,
            }}
        >
            <Outlet />
        </RegisterContext.Provider>
    );
};
