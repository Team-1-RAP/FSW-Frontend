import { useNavigate } from "react-router-dom"
import { BirthDateForm, IBirthDateForm } from "../../../components/fragments/Authentication/BirthDateForm"
import { useState } from "react"
import { useResetValidation } from "../../../hooks/useResetValidation"

export const PinBirthDateValidation = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const { pinValidationBirthDate, cardNumber } = useResetValidation()

  const onSubmit = async (data: IBirthDateForm) => {
    try {
      if (!cardNumber) {
        throw new Error("ATM card number is missing from context")
      }

      await pinValidationBirthDate(cardNumber.atm_card_no, `${data.year}-${data.month}-${data.day}`)
      navigate("../email")
    } catch (error) {
      const errorMessage = (error as Error).message || "An unknown error occurred"
      setErrorMessage("Error: " + errorMessage)
    }
  }

  return <BirthDateForm onSubmit={onSubmit} errorMessage={errorMessage} />
}
