import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormResetPasswordPinTemplate } from "../../elements/form/FormResetPasswordPinTemplate";

const EmailSchema = Yup.object({
  email: Yup.string().required("OTP is required").email("Email is not valid"),
});
export type IEmailForm = Yup.InferType<typeof EmailSchema>;

interface EmailFormProps {
  onSubmit: (data: IEmailForm) => void;
}

export const EmailForm = ({ onSubmit }: EmailFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmailForm>({
    resolver: yupResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <FormResetPasswordPinTemplate
      title="Email"
      message="Masukan email Anda untuk verifikasi akun menggunakan kode OTP"
    >
      <form
        className="flex flex-col w-full h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-3/4 flex flex-col gap-4">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="text"
            {...register("email")}
            className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
              errors.email ? "input-error" : "border-[#A09FA4]"
            }`}
            placeholder="Kode OTP"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="h-1/4">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-[10px] h-12 px-16 hover:bg-blue-700 focus:bg-blue-900"
          >
            Selanjutnya
          </button>
        </div>
      </form>
    </FormResetPasswordPinTemplate>
  );
};
