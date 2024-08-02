import { useNavigate } from "react-router-dom";
import {
  IPinVerificationForm,
  PinVerificationForm,
} from "../../../components/fragments/Authentication/PinConfirmationForm";
import { useResetValidation } from "../../../hooks/useResetValidation";
import { useState } from "react";

export const AuthPinVerification = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { pinValidation, cardNumber } = useResetValidation();

  const onSubmit = async (data: IPinVerificationForm) => {
    try {
      if (!cardNumber) {
        throw new Error("ATM card number is missing from context");
      }
      console.log("jalan");
      await pinValidation(cardNumber.atm_card_no, data.pin);
      navigate("../success");
    } catch (error) {
      const errorMessage =
        (error as Error).message || "An unknown error occurred";
      setErrorMessage("Error: " + errorMessage);
    }
  };
  return (
    <PinVerificationForm onSubmit={onSubmit} errorMessage={errorMessage} />
  );
};
