import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export interface ChangePasswordValidationContextProps {
  validationCurrentPassword: (current_password: string) => Promise<void>;
  isCurrentPasswordValid: boolean;
  validationEmail: (email: string) => Promise<void>;
  isEmailValid: boolean;
  validationOtp: (otp: string) => Promise<void>;
  isOtpValid: boolean;
  changePassword: (password: string, confirmPassword: string) => Promise<void>;
  isNewPasswordValid: boolean;
}

export const ChangePasswordValidationContext =
  createContext<ChangePasswordValidationContextProps | null>(null);

export const ChangePasswordValidationProvider = () => {
  const { token } = useAuth();
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] =
    useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isOtpValid, setIsOtpValid] = useState<boolean>(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState<boolean>(false);

  const validationCurrentPassword = async (current_password: string) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION +
          "change/password/validation/currentPassword",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ current_password }),
        }
      );

      const data = await response.json();
      if (data.code === 200 && data.data.flag_user.is_currentPass_valid) {
        console.log("Current Password Valid");
        setIsCurrentPasswordValid(true);
      } else {
        console.log(data);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error validating card:", error);
      throw error;
    }
  };

  const validationEmail = async (email: string) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION +
          "change/password/validation/email",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (data.code === 200 && data.data.flag_user.is_email_valid) {
        console.log("Email Valid");
        setIsEmailValid(true);
        console.log("OTP INFO", data.data.otp_code);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error validating card:", error);
      throw error;
    }
  };

  const validationOtp = async (otp: string) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION +
          "change/password/validation/otpVerify",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        }
      );

      const data = await response.json();
      if (data.code === 200 && data.data.flag_user.is_verified) {
        setIsOtpValid(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error validating card:", error);
      throw error;
    }
  };

  const changePassword = async (password: string, confirmPassword: string) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION +
          "change/password/validation/changePassword",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, confirmPassword }),
        }
      );

      const data = await response.json();
      if (data.code === 200) {
        setIsNewPasswordValid(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error validating card:", error);
      throw error;
    }
  };

  const contextValue: ChangePasswordValidationContextProps = {
    validationCurrentPassword,
    isCurrentPasswordValid,
    validationEmail,
    isEmailValid,
    validationOtp,
    isOtpValid,
    changePassword,
    isNewPasswordValid,
  };

  return (
    <ChangePasswordValidationContext.Provider value={contextValue}>
      <Outlet />
    </ChangePasswordValidationContext.Provider>
  );
};
