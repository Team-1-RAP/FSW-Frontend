import { useContext } from "react"
import { ResetValidationContext, ResetValidationContextProps } from "../context/ResetValidationContext"

export const useResetValidation = (): ResetValidationContextProps => {
  const context = useContext(ResetValidationContext)
  if (!context) {
    throw new Error("useResetValidationContext must be used within a ResetValidationProvider")
  }
  return context
}
