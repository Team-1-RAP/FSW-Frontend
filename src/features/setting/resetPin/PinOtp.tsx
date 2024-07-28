import { useLocation,useNavigate } from "react-router-dom";
import {
  IOtpForm,
  OtpForm,
} from "../../../components/fragments/Authentication/OtpForm";
import { useState } from "react";

export const PinOtp = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const onSubmit = async(data: IOtpForm) => {
    try {
      const response = await fetch (
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION + 'reset/password/validation/otpVerify',
        {
          method: "POST",
          headers: {
            "accept": 'application/json',
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            "atm_card_no": state.atm_card_no,
            "otp": data.otp
          })
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Success:', jsonResponse.message);
        navigate("/pengaturan/reset-pin/new-pin", { 
          state: { 
            atm_card_no: state.atm_card_no,
          }
        });
      } else {
        setErrorMessage('Error: ' + response.statusText);
      }

    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      setErrorMessage('Error: ' + errorMessage);
    }
    // navigate("/pengaturan/reset-pin/new-pin");
  };
  return <OtpForm onSubmit={onSubmit} email={state.email} errorMessage={errorMessage} />;
};
