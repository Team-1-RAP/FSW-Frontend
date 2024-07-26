import { useNavigate } from "react-router-dom";
import {
  IOtpForm,
  OtpForm,
} from "../../../components/fragments/Authentication/OtpForm";

export const PinOtp = () => {
  const navigate = useNavigate();
  const onSubmit = (data: IOtpForm) => {
    console.log("OTP PIN submitted");
    console.log(data);
    navigate("/pengaturan/reset-pin/new-pin");
  };
  return <OtpForm onSubmit={onSubmit} email="randyrundy@gmail.com" />;
};
