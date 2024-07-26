import { useNavigate } from "react-router-dom";
import {
  EmailForm,
  IEmailForm,
} from "../../../components/fragments/Authentication/EmailForm";

export const PinEmailVerification = () => {
  const navigate = useNavigate();
  const onSubmit = (data: IEmailForm) => {
    console.log("Email submitted");
    console.log(data);
    navigate("/pengaturan/reset-pin/otp");
  };
  return <EmailForm onSubmit={onSubmit} />;
};
