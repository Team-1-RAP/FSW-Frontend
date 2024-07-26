import { useNavigate } from "react-router-dom";
import { IPinVerificationForm, PinVerificationForm } from "../../../components/fragments/Authentication/PinConfirmationForm";


export const AuthPinVerification = () => {
  const navigate = useNavigate();
  const onSubmit = (data: IPinVerificationForm) => {
    console.log("Pin Verification submitted");
    console.log(data);
    navigate("/reset-password/success");
  };
  return <PinVerificationForm onSubmit={onSubmit} />;
};
