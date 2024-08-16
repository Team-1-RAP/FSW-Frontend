import { useNavigate } from "react-router-dom";
import { FormResetPasswordPinTemplate } from "../../../components/elements/form/FormResetPasswordPinTemplate";
import Button from "../../../components/fragments/Authentication/Button";

export const AuthResetPasswordSuccess = () => {
  const navigate = useNavigate();
  return (
    <FormResetPasswordPinTemplate
      title="Password Berhasil Diubah"
      message="Silakan gunakan kata sandi yang baru Anda buat saat melakukan login
          berikutnya"
    >
      <Button
        type="submit"
        className="bg-primary"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </FormResetPasswordPinTemplate>
  );
};
