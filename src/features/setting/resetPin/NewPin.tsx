import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../../hooks/useToggle";
import { FormResetPasswordPinTemplate } from "../../../components/elements/form/FormResetPasswordPinTemplate";
import * as Yup from "yup";

export const ResetPinSchema = Yup.object({
  pin: Yup.string()
    .required("PIN is required")
    .matches(/^[0-9]+$/, "PIN must be a number")
    .min(6, "PIN must be 6 digits")
    .max(6, "PIN must be 6 digits"),
  confirmPin: Yup.string()
    .required("Confirm PIN is required")
    .oneOf([Yup.ref("pin")], "PIN must match"),
});

export type IResetPinForm = Yup.InferType<typeof ResetPinSchema>;

export const NewPin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPinSchema),
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
  });
  const navigate = useNavigate();
  const [showPin, setShowPin] = useToggle(false);
  const [showConfirmPin, setShowConfirmPin] = useToggle(false);

  const onSubmit = (data: IResetPinForm) => {
    console.log(data);
    navigate("/pengaturan/reset-pin/success");
  };
  return (
    <FormResetPasswordPinTemplate
      title="Buat Pin"
      message="Buat pin baru yang belum pernah digunakan dan sesuai dengan ketentuan"
    >
      <form
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div>
          <div className="relative w-full flex items-center">
            <Controller
              control={control}
              name="pin"
              render={({ field }) => (
                <>
                  <label htmlFor="pin" className="sr-only">
                    Pin
                  </label>
                  <input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    {...field}
                    className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
                      errors.pin ? "input-error" : "border-[#A09FA4]"
                    }`}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value;
                      if (/^[0-9]*$/.test(value) && value.length <= 6) {
                        field.onChange(value);
                      }
                    }}
                    placeholder="Pin"
                  />
                  <button
                    type="button"
                    className={`absolute right-2 ${
                      errors.pin ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={setShowPin}
                  >
                    {showPin ? <Eye /> : <EyeOff />}
                  </button>
                </>
              )}
            />
          </div>
          {errors.pin && (
            <span className="text-red-500">{errors.pin.message}</span>
          )}
        </div>
        <div>
          <div className="relative w-full flex items-center">
            <Controller
              control={control}
              name="confirmPin"
              render={({ field }) => (
                <>
                  <label htmlFor="confirmPin" className="sr-only">
                    Konfirmasi Pin
                  </label>
                  <input
                    id="confirmPin"
                    type={showConfirmPin ? "text" : "password"}
                    {...field}
                    className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
                      errors.confirmPin ? "input-error" : "border-[#A09FA4]"
                    }`}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value;
                      if (/^[0-9]*$/.test(value) && value.length <= 6) {
                        field.onChange(value);
                      }
                    }}
                    placeholder="Konfirmasi Pin"
                  />
                  <button
                    type="button"
                    className={`absolute right-2 ${
                      errors.confirmPin ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={setShowConfirmPin}
                  >
                    {showConfirmPin ? <Eye /> : <EyeOff />}
                  </button>
                </>
              )}
            />
          </div>
          {errors.confirmPin && (
            <span className="text-red-500">{errors.confirmPin.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#0066AE] h-12 rounded-[10px] text-white hover:bg-sky-900 focus:bg-sky-950 px-16"
          onClick={(e) => e.currentTarget}
        >
          Selanjutnya
        </button>
      </form>
    </FormResetPasswordPinTemplate>
  );
};
