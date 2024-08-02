import * as Yup from "yup";
import { FormResetPasswordPinTemplate } from "../../../components/elements/form/FormResetPasswordPinTemplate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToggle } from "../../../hooks/useToggle";
import { Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useChangePassword } from "../../../hooks/useChangePassword";

const PasswordVerificationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
});

type IPasswordVerificationForm = Yup.InferType<
  typeof PasswordVerificationSchema
>;

export const PasswordVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordVerificationForm>({
    resolver: yupResolver(PasswordVerificationSchema),
    defaultValues: {
      password: "",
    },
  });
  const [show, setShow] = useToggle(false);
  const navigate = useNavigate();
  const [isRefresh, setIsRefresh] = useToggle(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { validationCurrentPassword, isCurrentPasswordValid } =
    useChangePassword();

  useEffect(() => {
    if (isCurrentPasswordValid && isRefresh) {
      console.log("Password is valid");
      setIsRefresh;
      navigate("email");
    }
  }, [isCurrentPasswordValid, navigate, isRefresh, setIsRefresh]);

  const onSubmit = async (data: IPasswordVerificationForm) => {
    setErrorMessage("");
    try {
      await validationCurrentPassword(data.password);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
      console.error("Error: ", error);
    }
  };
  return (
    <FormResetPasswordPinTemplate
      title="Ubah Password"
      message="Masukan password lama Anda"
    >
      <form
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full"
      >
        <div className="h-3/4 flex flex-col gap-4">
          <>
            <div className="relative w-full flex items-center">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type={show ? "text" : "password"}
                {...register("password")}
                className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
                  errors.password ? "input-error" : "border-[#A09FA4]"
                }`}
                placeholder="Password"
              />
              <button
                type="button"
                className={`absolute right-2 ${
                  errors.password ? "text-red-500" : "text-gray-500"
                }`}
                onClick={setShow}
              >
                {show ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </>
        </div>
        <div className="h-1/4">
          <button
            type="submit"
            className="bg-[#0066AE] h-12 rounded-[10px] text-white hover:bg-sky-900 focus:bg-sky-950 px-16"
            onClick={(e) => e.currentTarget}
          >
            Selanjutnya
          </button>
          <div>
            {errorMessage && (
              <span className="text-red-500">Pastikan data benar</span>
            )}
          </div>
        </div>
      </form>
    </FormResetPasswordPinTemplate>
  );
};
