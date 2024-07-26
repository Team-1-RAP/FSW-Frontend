import { useForm } from "react-hook-form";
import { IOtpForm, OtpSchema } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

export const Otp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOtpForm>({
    resolver: yupResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = (data: IOtpForm) => {
    console.log(data);
    navigate("pengaturan/reset-pin/new-pin");
  };

  return (
    <div className="text-center w-[340px] flex flex-col items-center gap-4 mb-48">
      <p className="font-medium text-2xl">Kode OTP</p>
      <p className="font-medium text-xs mx-11">
        <span>Masukan kode OTP yang telah dikirimkan melalui Email ke </span>
        <span className="text-blue-500">randyrundy@gmail.com</span>
      </p>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="otp" className="sr-only">
          OTP
        </label>
        <input
          id="otp"
          type="text"
          {...register("otp")}
          className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${
            errors.otp ? "input-error" : "border-[#A09FA4]"
          }`}
          placeholder="Kode OTP"
        />
        {errors.otp && (
          <span className="text-red-500">{errors.otp.message}</span>
        )}
      </form>
    </div>
  );
};
