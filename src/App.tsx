import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./features/guests/LandingPage";
import NotFound from "./features/NotFound";
import HomePage from "./features/home/HomePage";
import MutasiPage from "./features/mutasi/MutasiPage";
import PrivateRoute from "./components/fragments/Authentication/PrivateRoute";
import { AuthProvider } from "./context/AuthContext"; // Pastikan untuk mengimpor AuthProvider dari file yang benar
import { AccountProvider } from "./context/AccountContext";
import Profile from "./features/profile/Profile";
import LoginForm from "./features/authentication/LoginForm";
import AuthLayout from "./components/layouts/AuthLayout";
import { PengaturanLayout } from "./components/layouts/PengaturanLayout";
import { NewPin } from "./features/setting/resetPin/NewPin";
import { PinChangeSuccess } from "./features/setting/resetPin/PinChangeSuccess";
import { PinOtp } from "./features/setting/resetPin/PinOtp";
import { AuthOtpPassword } from "./features/authentication/resetPassword/AuthOtpPassword";
import { AuthNewPassword } from "./features/authentication/resetPassword/AuthNewPassword";
import { AuthPinVerification } from "./features/authentication/resetPassword/AuthPinVerification";
import { AuthResetPasswordSuccess } from "./features/authentication/resetPassword/AuthResetPasswordSuccess";
import { AuthEmailVerification } from "./features/authentication/resetPassword/AuthEmailVerification";
import { AuthBirthDateValidation } from "./features/authentication/resetPassword/AuthBirthDateValidation";
import { AuthCardValidation } from "./features/authentication/resetPassword/AuthCardValidation";
import { PinEmailVerification } from "./features/setting/resetPin/PinEmaiVerification";
import { PinBirthDateValidation } from "./features/setting/resetPin/PinBirthDateValidation";
import { CardInformation } from "./features/setting/resetPin/CardConfirmation";
import { Setting } from "./features/setting/Setting";

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
            <Route path="" element={<AuthCardValidation />} />
            <Route path="birth-date" element={<AuthBirthDateValidation />} />
            <Route path="email" element={<AuthEmailVerification />} />
            <Route path="otp" element={<AuthOtpPassword />} />
            <Route path="new-password" element={<AuthNewPassword />} />
            <Route path="pin-Verification" element={<AuthPinVerification />} />
            <Route path="success" element={<AuthResetPasswordSuccess />} />
          </Route>

          {/* Pengaturan - Private Route */}
          <Route path="/pengaturan" element={<PengaturanLayout />}>
          <Route path="" element={<Setting />} />
            <Route path="reset-pin">
              <Route path="" element={<CardInformation />} />
              <Route path="birth-date" element={<PinBirthDateValidation />} />
              <Route path="email" element={<PinEmailVerification />} />
              <Route path="otp" element={<PinOtp />} />
              <Route path="new-pin" element={<NewPin />} />
              <Route path="success" element={<PinChangeSuccess />} />
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
  );
}

export default App;
