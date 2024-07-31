import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import LandingPage from "./features/guests/LandingPage"
import NotFound from "./features/NotFound"
import HomePage from "./features/home/HomePage"
import MutasiPage from "./features/mutasi/MutasiPage"
import PrivateRoute from "./components/fragments/Authentication/PrivateRoute"
import { AuthProvider } from "./context/AuthContext" // Pastikan untuk mengimpor AuthProvider dari file yang benar
import { AccountProvider } from "./context/AccountContext"
import Profile from "./features/profile/Profile"
import LoginForm from "./features/authentication/LoginForm"
import AuthLayout from "./components/layouts/AuthLayout"
import { PengaturanLayout } from "./components/layouts/PengaturanLayout"
import { AuthOtpPassword } from "./features/authentication/resetPassword/AuthOtpPassword"
import { AuthNewPassword } from "./features/authentication/resetPassword/AuthNewPassword"
import { AuthPinVerification } from "./features/authentication/resetPassword/AuthPinVerification"
import { AuthResetPasswordSuccess } from "./features/authentication/resetPassword/AuthResetPasswordSuccess"
import { AuthEmailVerification } from "./features/authentication/resetPassword/AuthEmailVerification"
import { AuthBirthDateValidation } from "./features/authentication/resetPassword/AuthBirthDateValidation"
import { AuthCardValidation } from "./features/authentication/resetPassword/AuthCardValidation"
import { Setting } from "./features/setting/Setting"
import { ResetValidationProvider } from "./context/ResetValidationContext"
import { CardInformation } from "./features/setting/changePin/CardConfirmation"
import { PinBirthDateValidation } from "./features/setting/changePin/PinBirthDateValidation"
import { PinEmailVerification } from "./features/setting/changePin/PinEmaiVerification"
import { PinOtp } from "./features/setting/changePin/PinOtp"
import { NewPin } from "./features/setting/changePin/NewPin"
import { PinChangeSuccess } from "./features/setting/changePin/PinChangeSuccess"
import { PasswordVerification } from "./features/setting/changePassword/PasswordVerification"
import { PasswordEmailVerification } from "./features/setting/changePassword/PasswordEmailVerification"
import { PasswordChangeOtp } from "./features/setting/changePassword/PasswordChangeOtp"
import { NewPassword } from "./features/setting/changePassword/NewPassword"

function App() {
  return (
    <Router>
      <AuthProvider>
        {" "}
        {/* Memastikan AuthProvider ditempatkan di sini */}
        <Routes>
          {/* LandingPage - Public Route */}
          <Route path="/" element={<LandingPage />} />

          {/* LoginPage - Public Route */}
          <Route path="/login" element={<AuthLayout />}>
            <Route path="" element={<LoginForm />} />
          </Route>

          {/* {Reset Password} */}
          <Route path="/reset-password" element={<AuthLayout />}>
            {/* {Card Validation Input} */}
            <Route path="" element={<AuthCardValidation />} />
            {/* {Birth Date Validation} */}
            <Route path="birth-date" element={<AuthBirthDateValidation />} />
            {/* {Email Verification} */}
            <Route path="email" element={<AuthEmailVerification />} />
            {/* {OTP Verification} */}
            <Route path="otp" element={<AuthOtpPassword />} />
            {/* {New Password} */}
            <Route path="new-password" element={<AuthNewPassword />} />
            {/* {PIN Verification} */}
            <Route path="pin-Verification" element={<AuthPinVerification />} />
            {/* {Success} */}
            <Route path="success" element={<AuthResetPasswordSuccess />} />
          </Route>

          {/* Pengaturan - Private Route */}
          <Route path="/pengaturan" element={<PengaturanLayout />}>
            {/* {Setting Landing Page} */}
            <Route path="" element={<Setting />} />
            {/* {Reset PIN Schema} */}
            <Route path="change-pin">
              {/* {Selecting Card To PIN to Change} */}
              <Route
                path=""
                element={
                  <ResetValidationProvider>
                    <CardInformation />
                  </ResetValidationProvider>
                }
              />
              {/* {Birth Date Validation} */}
              <Route
                path="birth-date"
                element={
                  <ResetValidationProvider>
                    <PinBirthDateValidation />
                  </ResetValidationProvider>
                }
              />
              {/* {Email Verification} */}
              <Route
                path="email"
                element={
                  <ResetValidationProvider>
                    <PinEmailVerification />
                  </ResetValidationProvider>
                }
              />
              {/* {OTP Verification} */}
              <Route
                path="otp"
                element={
                  <ResetValidationProvider>
                    <PinOtp />
                  </ResetValidationProvider>
                }
              />
              {/* {New PIN} */}
              <Route
                path="new-pin"
                element={
                  <ResetValidationProvider>
                    <NewPin />
                  </ResetValidationProvider>
                }
              />
              {/* {Success} */}
              <Route path="success" element={<PinChangeSuccess />} />
            </Route>
            {/* {Change Password Schema} */}
            <Route path="change-password">
              {/* {Password Verification} */}
              <Route path="" element={<PasswordVerification />} />
              {/* {Email Verification} */}
              <Route path="email" element={<PasswordEmailVerification />} />
              {/* {OTP Verification} */}
              <Route path="otp" element={<PasswordChangeOtp />} />
              {/* {New Password} */}
              <Route path="new-password" element={<NewPassword />} />
            </Route>
          </Route>

          {/* HomePage - Private Route */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <AccountProvider>
                  <HomePage />
                </AccountProvider>
              </PrivateRoute>
            }
          />

          {/* MutasiPage - Private Route */}
          <Route
            path="/mutasi"
            element={
              <PrivateRoute>
                <MutasiPage />
              </PrivateRoute>
            }
          />

          {/* SettingPage - Private Route */}
          {/* <Route
            path="/pengaturan"
            element={
              <PrivateRoute>
                <SettingPage />
              </PrivateRoute>
            }
          /> */}

          {/* Profile - Private Route */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <AccountProvider>
                  <Profile />
                </AccountProvider>
              </PrivateRoute>
            }
          />

          {/* NotFound - Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
