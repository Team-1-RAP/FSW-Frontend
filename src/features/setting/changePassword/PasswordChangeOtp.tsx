import { useNavigate } from "react-router-dom";
import {
  IOtpForm,
  OtpForm,
} from "../../../components/fragments/Authentication/OtpForm";
import { useEffect, useState } from "react";
import { useChangePassword } from "../../../hooks/useChangePassword";
import { useToggle } from "../../../hooks/useToggle";

export const PasswordChangeOtp = () => {
  const navigate = useNavigate();
  const [isRefresh, setIsRefresh] = useToggle(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { isCurrentPasswordValid, isEmailValid, isOtpValid, validationOtp, email } =
    useChangePassword();
  useEffect(() => {
    if (!isEmailValid || !isCurrentPasswordValid || !isRefresh) {
      navigate(-1);
    } else if (isOtpValid && isRefresh) {
      setIsRefresh;
      navigate("../new-password");
    }
  }, [
    isCurrentPasswordValid,
    isEmailValid,
    isOtpValid,
    isRefresh,
    navigate,
    setIsRefresh,
  ]);
  const onSubmit = async (data: IOtpForm) => {
    setErrorMessage("");
    try {
      await validationOtp(data.otp);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
      console.error("Error: ", error);
    }
  };
  return (
    <OtpForm
      onSubmit={onSubmit}
      email={email}
      errorMessage={errorMessage}
    />
  );
};
