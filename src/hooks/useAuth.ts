import { useContext } from "react"
import { AuthContext, AuthContextProps } from "../context/AuthContext"

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    return {
      token: "",
      setToken: () => {}, // No-op function
      isAuthenticated: false,
      fullname: "Guest",
      logout: () => {}, // No-op function
    }
  }
  return context
}
