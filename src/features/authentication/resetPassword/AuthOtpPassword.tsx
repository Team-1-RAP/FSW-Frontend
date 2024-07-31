import { useNavigate } from "react-router-dom";
import {
  IOtpForm,
  OtpForm,
} from "../../../components/fragments/Authentication/OtpForm";

export const AuthOtpPassword = () => {
  const navigate = useNavigate();
  const onSubmit = (data: IOtpForm) => {
    console.log("OTP PIN submitted");
    console.log(data);
    navigate("/reset-password/new-password");
  };
  return <OtpForm onSubmit={onSubmit} email="randyrundy@gmail.com" errorMessage={""} />;
};
