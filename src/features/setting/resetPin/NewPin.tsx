import { useForm } from "react-hook-form";
import { useToggle } from "../../hooks/useToggle";
import { Eye, EyeOff } from "react-feather";
import { IResetPinForm, ResetPinSchema } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

export const NewPin = () => {
  const {
    register,
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
    navigate("pengaturan/reset-pin/success");
  };
  return (
    <div className="text-center w-[340px] flex flex-col items-center gap-4 mb-6">
      <p className="font-medium text-2xl">Buat Pin</p>
      <p className="font-medium text-xs mx-11 mb-4">
        Buat pin baru yang belum pernah digunakan dan sesuai dengan ketentuan
      </p>
      <form
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div>
          <div className="relative w-full flex items-center">
            <label htmlFor="pin" className="sr-only">
              Pin
            </label>
            <input
              id="pin"
              type={showPin ? "text" : "password"}
              {...register("pin")}
              className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
                errors.pin ? "input-error" : "border-[#A09FA4]"
              }`}
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
          </div>
          {errors.pin && (
            <span className="text-red-500">{errors.pin.message}</span>
          )}
        </div>
        <div>
          <div className="relative w-full flex items-center">
            <label htmlFor="confirmPin" className="sr-only">
              Konfirmasi Pin
            </label>
            <input
              id="confirmPin"
              type={showConfirmPin ? "text" : "password"}
              {...register("confirmPin")}
              className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
                errors.confirmPin ? "input-error" : "border-[#A09FA4]"
              }`}
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
          </div>
          {errors.confirmPin && (
            <span className="text-red-500">{errors.confirmPin.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-[10px] h-12 mt-10 mx-20 hover:bg-blue-700 focus:bg-blue-900"
        >
          Selanjutnya
        </button>
      </form>
    </div>
  );
};
