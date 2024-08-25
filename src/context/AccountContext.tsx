import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export interface IAccount {
    noAccount: string;
    fullName: string;
    accountType: string;
    cardNumber: string;
    expDate: Date;
    balance: number;
}

export interface IUserInfo {
    username: string;
    phoneNumber: string;
    email: string;
    nik?: string;
    bornDate?: string;
    address?: string;
}

export interface IAccountDetails {
    accountTypeId: number;
    address: string;
    accountPurposeId: number;
}

export interface AccountsContextProps {
    accounts: IAccount[] | null;
    setAccounts: (accounts: IAccount[] | null) => void;
    activeAccountIndex: number;
    setActiveAccountIndex: (index: number) => void;
    user: IUserInfo | null;
    setUser: (user: IUserInfo | null) => void;
    fetchAccounts: (token: string) => Promise<void>;
    fetchUserInfo: (token: string) => Promise<void>;
    accountDetails: IAccountDetails | null;
    setAccountDetails: (details: IAccountDetails | ((prevDetails: IAccountDetails | null) => IAccountDetails)) => void;
}

export const AccountContext = createContext<AccountsContextProps | null>(null);

export const AccountProvider: React.FC = () => {
    const [accounts, setAccounts] = useState<IAccount[] | null>(null);
    const [accountDetails, setAccountDetails] = useState<IAccountDetails | null>(null);
    const [activeAccountIndex, setActiveAccountIndex] = useState<number>(0);
    const [user, setUser] = useState<IUserInfo | null>(null);

    const fetchAccounts = async (token: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/accounts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch accounts");
            }

            const data = await response.json();
            if (data.status) {
                setAccounts(data.data);
            } else {
                throw new Error(data.message || "Failed to fetch accounts");
            }
        } catch (error) {
            console.error("Fetch accounts error:", error);
        }
    };

    const fetchUserInfo = async (token: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/v1/profiles`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch profile");
            }

            const data = await response.json();
            if (data.status) {
                setUser(data.data);
            } else {
                throw new Error(data.message || "Failed to fetch profile");
            }
        } catch (error) {
            console.error("Fetch profile error:", error);
        }
    };

    const contextValue: AccountsContextProps = {
        accounts,
        setAccounts,
        user,
        setUser,
        fetchAccounts,
        fetchUserInfo,
        activeAccountIndex,
        setActiveAccountIndex,
        accountDetails,
        setAccountDetails,
    };

    return (
        <AccountContext.Provider value={contextValue}>
            <Outlet />
        </AccountContext.Provider>
    );
};
