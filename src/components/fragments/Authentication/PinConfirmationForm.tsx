import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormResetPasswordPinTemplate } from "../../elements/form/FormResetPasswordPinTemplate";

const PinVerificationSchema = Yup.object({
  pin: Yup.string()
    .required("PIN is required")
    .matches(/^[0-9]+$/, "PIN must be a number")
    .min(6, "PIN must be 6 digits")
    .max(6, "PIN must be 6 digits"),
});
export type IPinVerificationForm = Yup.InferType<typeof PinVerificationSchema>;

interface PinVerificationFormProps {
  onSubmit: (data: IPinVerificationForm) => void;
  errorMessage: string;
}

export const PinVerificationForm = ({ onSubmit,  errorMessage}: PinVerificationFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPinVerificationForm>({
    resolver: yupResolver(PinVerificationSchema),
    defaultValues: {
      pin: "",
    },
  });

  return (
    <FormResetPasswordPinTemplate title="Masukan PIN">
      <form
        className="w-full flex flex-col justify-center h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="pin"
          render={({ field }) => (
            <div className="h-3/4 flex flex-col">
              <label htmlFor="pin" className="sr-only">
                PIN
              </label>
              <input
                id="pin"
                type="text"
                {...field}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value;
                  if (/^[0-9]*$/.test(value) && value.length <= 6) {
                    field.onChange(value);
                  }
                }}
                className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
                  errors.pin ? "input-error" : "border-[#A09FA4]"
                }`}
              />
              {errors.pin && (
                <span className="text-red-500">{errors.pin.message}</span>
              )}
            </div>
          )}
        />
        <div className="h-1/4 grid place-items-center">
          <button
            type="submit"
            className="bg-[#0066AE] h-12 rounded-[10px] text-white hover:bg-sky-900 focus:bg-sky-950 px-16"
            onClick={(e) => e.currentTarget}
          >
            Selanjutnya
          </button>
          {errorMessage && <span className="text-red-500">Pastikan data benar</span>}
        </div>
      </form>
    </FormResetPasswordPinTemplate>
  );
};
