import { useNavigate } from "react-router-dom";
import {
  IResetPasswordForm,
  NewPasswordForm,
} from "../../../components/fragments/Authentication/NewPasswordForm";
import { useEffect, useState } from "react";
import { useToggle } from "../../../hooks/useToggle";
import { useChangePassword } from "../../../hooks/useChangePassword";

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

  useEffect(() => {
    if (!isEmailValid || !isCurrentPasswordValid || !isRefresh || !isOtpValid) {
      navigate(-1);
    } else if (isNewPasswordValid && isRefresh) {
      setIsRefresh;
      navigate("/pengaturan");
    }
  }, [
    isCurrentPasswordValid,
    isEmailValid,
    isNewPasswordValid,
    isOtpValid,
    isRefresh,
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
