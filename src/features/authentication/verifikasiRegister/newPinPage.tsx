import { Controller, useForm } from "react-hook-form"
import { Eye, EyeOff } from "react-feather"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate, useParams } from "react-router-dom"
import { useToggle } from "../../../hooks/useToggle"
import { FormResetPasswordPinTemplate } from "../../../components/elements/form/FormResetPasswordPinTemplate"
import * as Yup from "yup"
import { useResetValidation } from "../../../hooks/useResetValidation"

export const ResetPinSchema = Yup.object({
  pin: Yup.string()
    .required("PIN is required")
    .matches(/^[0-9]+$/, "PIN must be a number")
    .min(6, "PIN must be 6 digits")
    .max(6, "PIN must be 6 digits"),
  confirmPin: Yup.string()
    .required("Confirm PIN is required")
    .oneOf([Yup.ref("pin")], "PIN must match"),
})

export type IResetPinForm = Yup.InferType<typeof ResetPinSchema>

const NewPinPage = () => {
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
  })
  const navigate = useNavigate()
  const [showPin, setShowPin] = useToggle(false)
  const [showConfirmPin, setShowConfirmPin] = useToggle(false)
  const { newPin } = useResetValidation()
  const { '*': token } = useParams();

  const onSubmit = async (data: IResetPinForm) => {
    if (token){
    try {
      await newPin(data.pin, data.confirmPin, token);
      navigate("/register/success/")
    } catch (error) {
      console.error("Error resetting PIN:", error)
    }
  }}
  return (
    <>
      <div className="mt-40">
        <FormResetPasswordPinTemplate title="Buat Pin">
          <form action="submit" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
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
                        className={`md:w-full w-[300px] ml-3 md:ml-0 h-12 border-[1px] rounded-[10px] px-4 ${errors.pin ? "input-error" : "border-[#A09FA4]"}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          const value = event.target.value
                          if (/^[0-9]*$/.test(value) && value.length <= 6) {
                            field.onChange(value)
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
                        className={`md:w-full w-[300px] ml-3 md:ml-0 h-12 border-[1px] rounded-[10px] px-4 ${errors.confirmPin ? "input-error" : "border-[#A09FA4]"}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          const value = event.target.value
                          if (/^[0-9]*$/.test(value) && value.length <= 6) {
                            field.onChange(value)
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
            </div>
            <div className="flex justify-center items-center">
              <button type="submit" className="bg-[#0066AE] h-12 rounded-[10px] text-white hover:bg-sky-900 focus:bg-sky-950 px-16 w-fit" onClick={(e) => e.currentTarget}>
                Buat Pin
              </button>
            </div>
          </form>
        </FormResetPasswordPinTemplate>
      </div>
    </>
  )
}

export default NewPinPage
