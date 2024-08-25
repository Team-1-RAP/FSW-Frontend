import { useNavigate } from "react-router-dom";
import {
  CardInformationForm,
  ICardInformationForm,
} from "../../../components/fragments/Authentication/CardInformationForm";
import { useState } from "react";
import { useResetValidation } from "../../../hooks/useResetValidation";

export const CardInformation = () => {
  const navigate = useNavigate();
  const { validationCard } = useResetValidation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    <div className="flex flex-col items-center">
      <CardInformationForm
        title="Ubah Pin"
        titleIsCenter={false}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
      />
    </div>
  );
};
