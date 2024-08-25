import React, { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { RegisterContext, RegisterContextProps } from "../../context/RegisterContext"
import { Eye, EyeOff } from "react-feather"
import { Link, useNavigate } from "react-router-dom"
import { useToggle } from "../../hooks/useToggle"
import LoaderModal from "../../components/Register/Modal"

const schema = yup.object().shape({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  username: yup.string().required("Username wajib diisi"),
  password: yup
    .string()
    .min(8, "Password minimal 8 karakter")
    .matches(/[A-Z]/, "Minimal terdapat 1 huruf kapital")
    .matches(/[0-9]/, "Minimal terdapat 1 angka")
    .matches(/[@$!%*?&#]/, "Minimal terdapat 1 simbol")
    .required("Password wajib diisi"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Konfirmasi Password tidak sesuai")
    .required("Konfirmasi Password wajib diisi"),
})

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { registerProfile } = useContext(RegisterContext) as RegisterContextProps
  const [showPassword, toggleShowPassword] = useToggle(false)
  const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  })

  const onSubmit = async (data: { email: string; username: string; password: string; confirmPassword: string }) => {
    setIsLoading(true)
    try {
      await registerProfile(data.email, data.username, data.password, data.confirmPassword)
      setTimeout(() => {
        setIsLoading(false)
        navigate("/register/verifikasi-email")
      }, 3000)
    } catch (error) {
      console.error("Registrasi gagal:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-[340px] mb-10">
      <LoaderModal isLoading={isLoading} />
      <h1 className="text-[28px] font-medium">Registrasi Akun</h1>
      <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <label htmlFor="email" className="block text-xs font-light">
            Email
          </label>
          <input type="email" id="email" placeholder="Email" className="w-full p-3 border rounded-lg border-[#C4C4C4]" {...register("email")} onChange={() => trigger("email")} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="username" className="block text-xs font-light">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full p-3 border rounded-lg border-[#C4C4C4]"
            {...register("username")}
            onChange={(e) => {
              trigger("username")
              if (e.target.value) {
                clearErrors("username")
              }
            }}
          />
          {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
          <div className="text-[#718EBF] text-[10px] font-light px-2 mt-1">
            <p>Minimal 6 karakter</p>
            <p>Tidak boleh hanya mengandung angka</p>
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="block text-xs font-light">
            Password
          </label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" className="w-full p-3 border rounded-lg border-[#C4C4C4]" {...register("password")} onChange={() => trigger("password")} />
            <button type="button" className="absolute right-2 inset-y-0 text-[#C4C4C4]" onClick={toggleShowPassword}>
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          <div className="text-[#718EBF] text-[10px] font-light px-2 mt-1">
            <p>Minimal 8 karakter</p>
            <p>Minimal terdapat 1 huruf kapital</p>
            <p>Minimal terdapat 1 angka</p>
            <p>Minimal terdapat 1 simbol</p>
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-xs font-light">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Konfirmasi Password"
              className="w-full p-3 border rounded-lg border-[#C4C4C4]"
              {...register("confirmPassword")}
              onChange={() => trigger("confirmPassword")}
            />
            <button type="button" className="absolute right-2 inset-y-0 text-[#C4C4C4]" onClick={toggleShowConfirmPassword}>
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <div className="flex flex-row w-full space-x-4 text-base font-bold">
          <Link to="/" className="py-3 border-[#055287] rounded-lg text-[#055287] w-1/2 border text-center">
            Kembali
          </Link>
          <button type="submit" className="py-3 bg-[#055287] rounded-lg text-white w-1/2">
            Selanjutnya
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
