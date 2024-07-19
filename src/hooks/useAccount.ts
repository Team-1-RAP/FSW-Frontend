import { useContext } from "react"
import { AccountContext, AccountsContextProps } from "../context/AccountContext"

export const useAccount = (): AccountsContextProps => {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error("useAccountContext must be used within an AccountProvider")
  }
  return context
}
