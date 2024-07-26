import { useNavigate } from "react-router-dom";
import { FormResetPasswordPinTemplate } from "../../../components/elements/form/FormResetPasswordPinTemplate";

export const AuthResetPasswordSuccess = () => {
  const navigate = useNavigate();
  return (
    <FormResetPasswordPinTemplate
      title="Password Berhasil Diubah"
      message="Silakan gunakan kata sandi yang baru Anda buat saat melakukan login
          berikutnya"
    >
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="bg-[#0079CB] text-white rounded-[10px] h-12 px-16 mt-10 hover:bg-blue-700 focus:bg-blue-900"
      >
        Login
      </button>
    </FormResetPasswordPinTemplate>
  );
};
