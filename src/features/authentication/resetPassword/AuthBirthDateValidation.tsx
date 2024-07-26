import { useNavigate } from "react-router-dom";
import { BirthDateForm, IBirthDateForm } from "../../../components/fragments/Authentication/BirthDateForm";

export const AuthBirthDateValidation = () => {
  const navigate = useNavigate();
  const onSubmit = (data: IBirthDateForm) => {
    console.log("Birth date submitted");
    console.log(new Date(parseInt(data.year), parseInt(data.month) - 1, parseInt(data.day)));
    navigate("/reset-password/email");
  };
  return <BirthDateForm onSubmit={onSubmit} />;
}