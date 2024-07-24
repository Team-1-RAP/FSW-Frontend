import { createContext, useState } from "react";

export interface IAccount {
  noAccount: number;
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
}
export interface AccountsContextProps {
  accounts: IAccount[] | null;
  setAccounts: (accounts: IAccount[] | null) => void;
  user: IUserInfo | null;
  setUser: (user: IUserInfo | null) => void;
  fetchAccounts: (token: string) => Promise<void>;
  fetchUserInfo: (token: string) => Promise<void>;
}
export const AccountContext = createContext<AccountsContextProps | null>(null);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState<IAccount[] | null>(null);
  const [user, setUser] = useState<IUserInfo | null>(null);

  const fetchAccounts = async (token: string) => {
    try {
      const response = await fetch(
        "https://simplebank-stg.koyeb.app/api/v1/accounts",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("fetch accounts");

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
      const response = await fetch(
        "https://simplebank-stg.koyeb.app/api/v1/profiles",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("fetch profile");

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      console.log(data);

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
  };
  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};
