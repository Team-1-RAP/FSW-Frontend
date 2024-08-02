import { useNavigate } from "react-router-dom";
import {
  EmailForm,
  IEmailForm,
} from "../../../components/fragments/Authentication/EmailForm";
import { useEffect, useState } from "react";
import { useChangePassword } from "../../../hooks/useChangePassword";
import { useToggle } from "../../../hooks/useToggle";

export const PasswordEmailVerification = () => {
  const navigate = useNavigate();
  const [isRefresh, setIsRefresh] = useToggle(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { isCurrentPasswordValid, isEmailValid, validationEmail } =
    useChangePassword();
  useEffect(() => {
    if (!isCurrentPasswordValid || !isRefresh) {
      navigate(-1);
    } else if (isEmailValid && isRefresh) {
      setIsRefresh;
      navigate("../otp");
    }
  }, [isCurrentPasswordValid, isEmailValid, isRefresh, navigate, setIsRefresh]);
  const onSubmit = async (data: IEmailForm) => {
    setErrorMessage("");
    try {
      await validationEmail(data.email);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
      console.error("Error: ", error);
    }
  };
  return <EmailForm onSubmit={onSubmit} errorMessage={errorMessage} />;
};
