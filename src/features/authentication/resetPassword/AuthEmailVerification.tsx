import { useNavigate } from "react-router-dom"
import { EmailForm, IEmailForm } from "../../../components/fragments/Authentication/EmailForm"
import { useState } from "react"
import { useResetValidation } from "../../../hooks/useResetValidation"

export const AuthEmailVerification = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const { validationEmail, cardNumber } = useResetValidation()

  const onSubmit = async (data: IEmailForm) => {
    try {
      if (!cardNumber) {
        throw new Error("ATM card number is missing from context")
      }

      await validationEmail(cardNumber.atm_card_no, data.email)
      navigate("/reset-password/otp")
    } catch (error) {
      const errorMessage = (error as Error).message || "An unknown error occurred"
      setErrorMessage("Error: " + errorMessage)
    }
  }
  return <EmailForm onSubmit={onSubmit} errorMessage={errorMessage} />
}
