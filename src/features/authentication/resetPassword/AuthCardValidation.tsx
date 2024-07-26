import { useNavigate } from "react-router-dom";
import {
  CardInformationForm,
  ICardInformationForm,
} from "../../../components/fragments/Authentication/CardInformationForm";

export const AuthCardValidation = () => {
  const navigate = useNavigate();
  const onSubmit = (data: ICardInformationForm) => {
    console.log("Card information submitted");
    console.log(
      new Date(parseInt("20" + data.cardExpYear), parseInt(data.cardExpMonth) - 1)
    );
    navigate("/reset-password/birth-date");
  };
  return <CardInformationForm onSubmit={onSubmit} />;
};
