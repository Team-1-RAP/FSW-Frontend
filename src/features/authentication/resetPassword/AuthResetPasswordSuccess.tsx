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
        className="bg-[#0066AE] h-12 mt-10 rounded-[10px] text-white hover:bg-sky-900 focus:bg-sky-950 px-16"
        onClick={(e) => {
          e.currentTarget;
          navigate("/login");
        }}
      >
        Login
      </button>
    </FormResetPasswordPinTemplate>
  );
};
