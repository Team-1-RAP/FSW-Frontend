import { useNavigate } from "react-router-dom";
import { useResetValidation } from "../../../hooks/useResetValidation";
import { useState } from "react";
import {
  CardInformationForm,
  ICardInformationForm,
} from "../../../components/fragments/Authentication/CardInformationForm";

export const AuthCardValidation = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { validationCard } = useResetValidation();

  const onSubmit = async (data: ICardInformationForm) => {
    setErrorMessage(null); // Clear previous errors
    try {
      // Context ResetValidation
      await validationCard(
        data.cardNumber,
        data.cardExpMonth,
        data.cardExpYear
      );
      navigate("birth-date");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      ); // Set error message
      console.error("Error:", error);
    }
  };
  return (
    <CardInformationForm
      title="Masukan Data Kartu"
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
};
