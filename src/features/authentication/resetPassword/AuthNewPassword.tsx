import { useNavigate } from "react-router-dom";
import { useState } from "react"
import {
  IResetPasswordForm,
  NewPasswordForm,
} from "../../../components/fragments/Authentication/NewPasswordForm";
import { useResetValidation } from "../../../hooks/useResetValidation"

export const AuthNewPassword = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();
  const { resetPassword, cardNumber } = useResetValidation()

  const onSubmit = async (data: IResetPasswordForm) => {
    try {
      if (!cardNumber) {
        throw new Error("ATM card number is missing from context")
      }

      await resetPassword(cardNumber.atm_card_no, data.password, data.confirmPassword)
      navigate("/reset-password/pin-Verification")
    } catch (error) {
      const errorMessage = (error as Error).message || "An unknown error occurred"
      setErrorMessage("Error: " + errorMessage)
    }
  };
  return <NewPasswordForm onSubmit={onSubmit} errorMessage={errorMessage}/>;
};
