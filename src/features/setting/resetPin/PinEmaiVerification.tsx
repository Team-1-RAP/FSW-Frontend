import { useLocation,useNavigate } from "react-router-dom";
import {
  EmailForm,
  IEmailForm,
} from "../../../components/fragments/Authentication/EmailForm";
import { useState } from "react";

export const PinEmailVerification = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const atm_card_no = location.state?.atm_card_no;
  const onSubmit = async(data: IEmailForm) => {
    try {
      const response = await fetch (
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION + 'reset/password/validation/email',
        {
          method: "POST",
          headers: {
            "accept": 'application/json',
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            "atm_card_no": atm_card_no,
            "email": data.email
          })
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Success:', jsonResponse.message);
        navigate("/pengaturan/reset-pin/otp", { 
          state: { 
            atm_card_no: atm_card_no,
            email: data.email
          }
        });
      } else {
        setErrorMessage('Error: ' + response.statusText);
      }

    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      setErrorMessage('Error: ' + errorMessage);
    }
    // navigate("/pengaturan/reset-pin/otp");
  };
  return <EmailForm onSubmit={onSubmit} errorMessage={errorMessage} />;
};
