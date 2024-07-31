import { Controller, useForm } from "react-hook-form"
import { FormResetPasswordPinTemplate } from "../../elements/form/FormResetPasswordPinTemplate"
import Card from "../Card"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useRef } from "react"

const CardInformationSchema = Yup.object({
  cardNumber: Yup.string().required("Card Number is required").min(16, "Card Number must be 16 digits").max(16, "Card Number must be 16 digits"),
  cardExpMonth: Yup.string().required("Card Expiry Month is required"),
  cardExpYear: Yup.string().required("Card Expiry Year is required"),
})

export type ICardInformationForm = Yup.InferType<typeof CardInformationSchema>

interface CardInformationFormProps {
  onSubmit: (data: ICardInformationForm) => void
  errorMessage?: string | null
}

export const CardInformationForm = ({ onSubmit, errorMessage }: CardInformationFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICardInformationForm>({
    resolver: yupResolver(CardInformationSchema),
    defaultValues: {
      cardNumber: "",
      cardExpMonth: "",
      cardExpYear: "",
    },
  })
  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    const formElement = formRef.current
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault()
        handleSubmit(onSubmit)()
      }
    }

    if (formElement) {
      formElement.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [handleSubmit, onSubmit])
  return (
    <FormResetPasswordPinTemplate title="Ubah Pin">
      <div className="flex flex-col gap-3 items-center">
        <Card variant="purpleCyan" size="sm" previewHidden={true} />
        {/* Error */}
        {errorMessage && <div className="text-red-500 mt-4">Pastikan Data Benar</div>}
        <form ref={formRef} className="flex flex-col">
          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <div className={`${!errors.cardNumber && "mb-3"}`}>
                <label htmlFor="cardNumber" className="sr-only">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  {...field}
                  placeholder="Card Number"
                  className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${errors.cardNumber ? "input-error" : "border-[#A09FA4]"}`}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value
                    if (/^[0-9]*$/.test(value) && value.length <= 16) {
                      field.onChange(value)
                    }
                  }}
                />
                {errors.cardNumber && <span className="text-red-500">{errors.cardNumber.message}</span>}
              </div>
            )}
          />
          <p className="text-start mb-3">Masa Berlaku:</p>
          <div className="flex flex-row gap-8">
            <Controller
              name="cardExpMonth"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <label htmlFor="cardExpMonth" className="sr-only">
                    The month of card expiry
                  </label>
                  <input
                    id="cardExpMonth"
                    type="text"
                    {...field}
                    placeholder="MM"
                    className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${errors.cardExpMonth ? "input-error" : "border-[#A09FA4]"}`}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value
                      if (/^[0-9]*$/.test(value) && value.length <= 2) {
                        field.onChange(value)
                      }
                    }}
                  />
                  {errors.cardExpMonth && <span className="text-red-500">{errors.cardExpMonth.message}</span>}
                </div>
              )}
            />
            <Controller
              name="cardExpYear"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <label htmlFor="cardExpYear" className="sr-only">
                    The year of card expiry
                  </label>
                  <input
                    id="cardExpYear"
                    type="text"
                    {...field}
                    placeholder="YYYY"
                    className={`w-full h-12 border-[1px] rounded-[10px] px-4 ${errors.cardExpYear ? "input-error" : "border-[#A09FA4]"}`}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value
                      if (/^[0-9]*$/.test(value) && value.length <= 4) {
                        field.onChange(value)
                      }
                    }}
                  />
                  {errors.cardExpYear && <span className="text-red-500">{errors.cardExpYear.message}</span>}
                </div>
              )}
            />
          </div>
        </form>
      </div>
    </FormResetPasswordPinTemplate>
  )
}
