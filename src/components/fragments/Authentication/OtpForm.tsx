import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { FormResetPasswordPinTemplate } from "../../elements/form/FormResetPasswordPinTemplate"

const OtpSchema = Yup.object({
  otp: Yup.string().required("OTP is required").min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
})
export type IOtpForm = Yup.InferType<typeof OtpSchema>

interface OtpFormProps {
  onSubmit: (data: IOtpForm) => void;
  email: string;
  errorMessage: string;
}

export const OtpForm = ({ onSubmit, email, errorMessage }: OtpFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IOtpForm>({
    resolver: yupResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  })

  return (
    <FormResetPasswordPinTemplate
      title="Kode OTP"
      message="Masukan kode OTP yang telah dikirimkan melalui Email ke"
      email={email}
    >
      <form
        className="w-full flex flex-col justify-center h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-3/4 flex flex-col">
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  {...field}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    if (value.length <= 6) {
                      field.onChange(value);
                    }
                  }}
                  className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
                    errors.otp ? "input-error" : "border-[#A09FA4]"
                  }`}
                />
                {errors.otp && (
                  <span className="text-red-500 text-sm">
                    {errors.otp.message}
                  </span>
                )}
                {errorMessage && (
                  <span className="text-red-500">Pastikan data benar</span>
                )}
              </div>
            )}
          />
        </div>
        <div className="h-1/4">
          <button
            type="submit"
            className="bg-[#0066AE] h-12 rounded-[10px] text-white hover:bg-sky-900 focus:bg-sky-950 px-16"
            onClick={(e) => e.currentTarget}
          >
            Selanjutnya
          </button>
        </div>
      </form>
    </FormResetPasswordPinTemplate>
  )
}
