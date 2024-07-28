import { useNavigate } from "react-router-dom";
import {
  CardInformationForm,
  ICardInformationForm,
} from "../../../components/fragments/Authentication/CardInformationForm";

export const CardInformation = () => {
  const navigate = useNavigate();
  const onSubmit = async (data: ICardInformationForm) => {
    try {
      const response = await fetch (
        import.meta.env.VITE_API_BASE_URL_NON_TRANSACTION + 'reset/password/validation/card',
        {
          method: "POST",
          headers: {
            "accept": 'application/json',
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            "atm_card_no": data.cardNumber,
            "expMonth": data.cardExpMonth,
            "expYear": "20" + data.cardExpYear
          })
        }
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Success:', jsonResponse.message);  

        navigate("birth-date", { state: { atm_card_no: jsonResponse.data.atm_card_no } });
      } else {
        console.error('Error:', response.statusText);
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
    
    // navigate("/pengaturan/reset-pin/birth-date");
  };
  return <CardInformationForm onSubmit={onSubmit} />;
};
