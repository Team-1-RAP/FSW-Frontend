import { useContext } from "react"
import { ChangePasswordValidationContext, ChangePasswordValidationContextProps } from "../context/ChangePasswordValidationContext"

export const useChangePassword = (): ChangePasswordValidationContextProps => {
    const context = useContext(ChangePasswordValidationContext)
    if (!context) {
      throw new Error("useResetValidationContext must be used within a ResetValidationProvider")
    }
    return context
  }