import { useNavigate, useParams } from "react-router-dom";
import { useResetValidation } from "../../../hooks/useResetValidation";
import FormPin from "../../../components/elements/form/FormPin";
import { IResetPinForm } from "../../../utils/validationSchema";

const NewPinPage = () => {
    const navigate = useNavigate();
    const { newPin } = useResetValidation();
    const { "*": token } = useParams();

    const handleSubmit = async (data: IResetPinForm) => {
        if (token) {
            try {
                await newPin(data.pin, data.confirmPin, token);
                navigate("/register/success/");
            } catch (error) {
                console.error("Error resetting PIN:", error);
            }
        }
    };

    return <FormPin title="Buat Pin" onSubmit={handleSubmit} />;
};

export default NewPinPage;
