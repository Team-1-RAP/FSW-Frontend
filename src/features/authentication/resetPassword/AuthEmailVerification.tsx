import { useNavigate } from "react-router-dom";
import {
  EmailForm,
  IEmailForm,
} from "../../../components/fragments/Authentication/EmailForm";

export const AuthEmailVerification = () => {
  const navigate = useNavigate();
  const onSubmit = (data: IEmailForm) => {
    console.log("Email submitted");
    console.log(data);
    navigate("/reset-password/otp");
  };
  return <EmailForm onSubmit={onSubmit} />;
};
