import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
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
}

export const PinVerificationForm = ({ onSubmit }: PinVerificationFormProps) => {
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
  const navigation = useNavigate();

  onSubmit = (data: IPinVerificationForm) => {
    console.log(data);
    navigation("/reset-password/success");
  };

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
            <div className="h-3/4 flex">
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
