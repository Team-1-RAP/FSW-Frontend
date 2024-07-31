import { useNavigate } from "react-router-dom"
import { IOtpForm, OtpForm } from "../../../components/fragments/Authentication/OtpForm"
import { useState } from "react"
import { useResetValidation } from "../../../hooks/useResetValidation"

export const PinOtp = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const { validationOtp, cardNumber, email } = useResetValidation()

  const onSubmit = async (data: IOtpForm) => {
    try {
      if (!cardNumber) {
        throw new Error("ATM card number is missing from context")
      }

      await validationOtp(cardNumber.atm_card_no, data.otp)
      navigate("/pengaturan/reset-pin/new-pin")
    } catch (error) {
      const errorMessage = (error as Error).message || "An unknown error occurred"
      setErrorMessage("Error: " + errorMessage)
    }
  }
  return <OtpForm onSubmit={onSubmit} email={email ?? ""} errorMessage={errorMessage} />
}
