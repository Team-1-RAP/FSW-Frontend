import { useNavigate } from "react-router-dom";
import {
  IResetPasswordForm,
  NewPasswordForm,
} from "../../../components/fragments/Authentication/NewPasswordForm";
import { useEffect, useState } from "react";
import { useToggle } from "../../../hooks/useToggle";
import { useChangePassword } from "../../../hooks/useChangePassword";
import { useAuth } from "../../../hooks/useAuth";

export const NewPassword = () => {
  const navigate = useNavigate();
  const [isRefresh, setIsRefresh] = useToggle(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    isCurrentPasswordValid,
    isEmailValid,
    isOtpValid,
    isNewPasswordValid,
    changePassword,
  } = useChangePassword();
  const { logout } = useAuth();

  useEffect(() => {
    if (!isEmailValid || !isCurrentPasswordValid || !isRefresh || !isOtpValid) {
      navigate(-1);
    } else if (isNewPasswordValid && isRefresh) {
      setIsRefresh;
      logout();
      navigate("/login", {
        state: { notificationMessage: "Password berhasil diubah" },
      });
    }
  }, [
    isCurrentPasswordValid,
    isEmailValid,
    isNewPasswordValid,
    isOtpValid,
    isRefresh,
    logout,
    navigate,
    setIsRefresh,
  ]);
  const onSubmit = async (data: IResetPasswordForm) => {
    setErrorMessage("");
    try {
      await changePassword(data.password, data.confirmPassword);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
      console.error("Error: ", error);
    }
  };
  return <NewPasswordForm onSubmit={onSubmit} errorMessage={errorMessage} />;
};
