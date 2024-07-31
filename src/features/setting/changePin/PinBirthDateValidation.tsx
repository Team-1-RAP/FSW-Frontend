import { useLocation, useNavigate } from "react-router-dom";
import {
  BirthDateForm,
  IBirthDateForm,
} from "../../../components/fragments/Authentication/BirthDateForm";
import { useState } from "react";

export const PinBirthDateValidation = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const atm_card_no = location.state?.atm_card_no;

  const onSubmit = async (data: IBirthDateForm) => {
    try {
      const response = await fetch (
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION + 'reset/password/validation/birthDate',
        {
          method: "POST",
          headers: {
            "accept": 'application/json',
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            "atm_card_no": atm_card_no,
            "born_date": data.year+'-'+data.month+'-'+data.day
          })
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Success:', jsonResponse.message);
        navigate("/pengaturan/change-pin/email", { state: { atm_card_no: atm_card_no } });
      } else {
        setErrorMessage('Error: ' + response.statusText);
      }

    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      setErrorMessage('Error: ' + errorMessage);
    }
  };

  return <BirthDateForm onSubmit={onSubmit} errorMessage={errorMessage} />;
};
