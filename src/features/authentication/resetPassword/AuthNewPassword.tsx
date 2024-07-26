import { useNavigate } from "react-router-dom";
import {
  IResetPasswordForm,
  NewPasswordForm,
} from "../../../components/fragments/Authentication/NewPasswordForm";

export const AuthNewPassword = () => {
  const navigate = useNavigate();
  const onSubmit = (data: IResetPasswordForm) => {
    console.log("New Password submitted");
    console.log(data);
    navigate("/reset-password/pin-Verification");
  };
  return <NewPasswordForm onSubmit={onSubmit} />;
};
