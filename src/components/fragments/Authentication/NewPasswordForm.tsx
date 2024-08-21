import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useToggle } from "../../../hooks/useToggle";
import { FormResetPasswordPinTemplate } from "../../elements/form/FormResetPasswordPinTemplate";
import Button from "./Button";

export const ResetPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one symbol"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Password must match"),
});

export type IResetPasswordForm = Yup.InferType<typeof ResetPasswordSchema>;

interface NewPasswordFormProps {
  onSubmit: (data: IResetPasswordForm) => void;
  errorMessage: string;
}

export const NewPasswordForm = ({
  onSubmit,
  errorMessage,
}: NewPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [show, setShow] = useToggle(false);
  const [showConfirm, setShowConfirm] = useToggle(false);

  const passwordValue = watch("password");

  const isMinLengthValid = passwordValue.length >= 8;
  const hasUpperCase = /[A-Z]/.test(passwordValue);
  const hasNumber = /\d/.test(passwordValue);
  const hasSymbol = /[@$!%*?&#]/.test(passwordValue);

  return (
    <FormResetPasswordPinTemplate
      title="Buat Password"
      message="Buat Password baru yang belum pernah digunakan dan sesuai dengan ketentuan"
    >
      <form
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full"
      >
        <div className="h-3/4 flex flex-col gap-4">
          <div>
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
            <div className="text-start ps-4 text-xs font-light text-[#718EBF]">
              <p
                className={
                  (!isMinLengthValid && errors.password)
                    ? "text-red-500"
                    : ""
                }
              >
                {!isMinLengthValid && errors.password && (
                  <span className="sr-only">Error</span>
                )}
                <span>Minimal 8 karakter</span>
              </p>
              <p
                className={
                  !hasUpperCase && errors.password
                    ? "text-red-500"
                    : ""
                }
              >
                {!hasUpperCase && errors.password && (
                  <span className="sr-only">Error</span>
                )}
                <span>Minimal terdapat 1 huruf kapital</span>
              </p>
              <p
                className={
                  !hasNumber && errors.password
                    ? "text-red-500"
                    : ""
                }
              >
                {!hasNumber && errors.password && (
                  <span className="sr-only">Error</span>
                )}
                <span>Minimal terdapat 1 angka</span>
              </p>
              <p
                className={
                  !hasSymbol && errors.password
                    ? "text-red-500"
                    : "text-[#718EBF]"
                }
              >
                {!hasSymbol && errors.password && (
                  <span className="sr-only">Error</span>
                )}
                <span>Minimal terdapat 1 simbol</span>
              </p>
            </div>
          </div>
          <div>
            <div className="relative w-full flex items-center">
              <label htmlFor="confirmPassword" className="sr-only">
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
                  errors.confirmPassword ? "input-error" : "border-[#A09FA4]"
                }`}
                placeholder="Konfirmasi Password"
              />
              <button
                type="button"
                className={`absolute right-2 ${
                  errors.confirmPassword ? "text-red-500" : "text-gray-500"
                }`}
                onClick={setShowConfirm}
              >
                {showConfirm ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-start ps-4">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="h-1/4">
          <Button type="submit" className="bg-primary">
            Selanjutnya
          </Button>
          <div>
            {errorMessage && (
              <span className="text-red-500">Pastikan password sesuai</span>
            )}
          </div>
        </div>
      </form>
    </FormResetPasswordPinTemplate>
  );
};
