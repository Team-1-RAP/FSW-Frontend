import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

// Define interfaces
export interface IAccount {
  atm_card_no: string;
}

export interface ResetValidationContextProps {
  cardNumber: IAccount | null;
  setCardNumber: (account: IAccount | null) => void;
  validationCard: (
    atm_card_no: string,
    expMonth: string,
    expYear: string
  ) => Promise<void>;
  validationBirthDate: (
    atm_card_no: string,
    birthDate: string
  ) => Promise<void>;
  validationEmail: (atm_card_no: string, email: string) => Promise<void>;
  email: string | null;
  setEmail: (email: string | null) => void;
  validationOtp: (atm_card_no: string, otp: string) => Promise<void>;
  resetPin: (
    atm_card_no: string,
    pin: string,
    confirmPin: string
  ) => Promise<void>;
}

// Create context
export const ResetValidationContext =
  createContext<ResetValidationContextProps | null>(null);

export const ResetValidationProvider = () => {
  const [cardNumber, setCardNumber] = useState<IAccount | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const validationCard = async (
    cardNumber: string,
    cardExpMonth: string,
    cardExpYear: string
  ) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION +
          "reset/password/validation/card",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            atm_card_no: cardNumber,
            expMonth: cardExpMonth,
            expYear: cardExpYear,
          }),
        }
      );

      const data = await response.json();
      if (data.code === 200) {
        setCardNumber({ atm_card_no: data.data.atm_card_no });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error validating card:", error);
      throw error;
    }
  };

  const validationBirthDate = async (
    atm_card_no: string,
    birthDate: string
  ) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION +
          "reset/password/validation/birthDate",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            atm_card_no,
            born_date: birthDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error validating birth date");
      }
    } catch (error) {
      console.error("Error validating birth date:", error);
      throw error;
    }
  };

  const validationEmail = async (atm_card_no: string, email: string) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION +
          "reset/password/validation/email",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            atm_card_no,
            email,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error validating email");
      }
      setEmail(email);
    } catch (error) {
      console.error("Error validating email:", error);
      throw error;
    }
  };

  const validationOtp = async (atm_card_no: string, otp: string) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION +
          "reset/password/validation/otpVerify",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            atm_card_no,
            otp,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error validating OTP");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      throw error;
    }
  };

  const resetPin = async (
    atm_card_no: string,
    pin: string,
    confirmPin: string
  ) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION + "reset/password",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            atm_card_no,
            pin,
            confirmPin,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error resetting PIN");
      }
    } catch (error) {
      console.error("Error resetting PIN:", error);
      throw error;
    }
  };
  const contextValue = {
    cardNumber,
    setCardNumber,
    validationCard,
    validationBirthDate,
    validationEmail,
    email,
    setEmail,
    validationOtp,
    resetPin,
  };

  return (
    <ResetValidationContext.Provider value={contextValue}>
      <Outlet />
    </ResetValidationContext.Provider>
  );
};
