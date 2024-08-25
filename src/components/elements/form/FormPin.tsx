import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToggle } from "../../../hooks/useToggle";
import { FormResetPasswordPinTemplate } from "../../../components/elements/form/FormResetPasswordPinTemplate";
import { ResetPinSchema, IResetPinForm } from "../../../utils/validationSchema";

interface FormPinProps {
    title: string;
    onSubmit: (data: IResetPinForm) => void;
}

const FormPin: React.FC<FormPinProps> = ({ title, onSubmit }) => {
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

    const [showPin, setShowPin] = useToggle(false);
    const [showConfirmPin, setShowConfirmPin] = useToggle(false);

    return (
        <FormResetPasswordPinTemplate title={title}>
            <form action="submit" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                {/* Input untuk PIN */}
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
                                    className={`md:w-full w-[300px] ml-3 md:ml-0 h-12 border-[1px] rounded-[10px] px-4 ${errors.pin ? "input-error" : "border-[#A09FA4]"}`}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = event.target.value;
                                        if (/^[0-9]*$/.test(value) && value.length <= 6) {
                                            field.onChange(value);
                                        }
                                    }}
                                    placeholder="Pin"
                                />
                                <button type="button" className={`absolute md:right-2 right-10 ${errors.pin ? "text-red-500" : "text-gray-500"}`} onClick={setShowPin}>
                                    {showPin ? <Eye /> : <EyeOff />}
                                </button>
                            </>
                        )}
                    />
                </div>
                {errors.pin && <span className="text-red-500">{errors.pin.message}</span>}

                {/* Input untuk Konfirmasi PIN */}
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
                                    className={`md:w-full w-[300px] ml-3 md:ml-0 h-12 border-[1px] rounded-[10px] px-4 ${errors.confirmPin ? "input-error" : "border-[#A09FA4]"}`}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = event.target.value;
                                        if (/^[0-9]*$/.test(value) && value.length <= 6) {
                                            field.onChange(value);
                                        }
                                    }}
                                    placeholder="Konfirmasi Pin"
                                />
                                <button type="button" className={`absolute md:right-2 right-10 ${errors.confirmPin ? "text-red-500" : "text-gray-500"}`} onClick={setShowConfirmPin}>
                                    {showConfirmPin ? <Eye /> : <EyeOff />}
                                </button>
                            </>
                        )}
                    />
                </div>
                {errors.confirmPin && <span className="text-red-500">{errors.confirmPin.message}</span>}

                <div className="flex justify-center items-center">
                    <button type="submit" className="bg-[#0066AE] h-12 rounded-[10px] text-white hover:bg-sky-900 focus:bg-sky-950 px-16 w-fit">
                        {title}
                    </button>
                </div>
            </form>
        </FormResetPasswordPinTemplate>
    );
};

export default FormPin;
