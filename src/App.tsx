import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./features/guests/LandingPage";
import NotFound from "./features/NotFound";
import HomePage from "./features/home/HomePage";
import LoginPage from "./features/authentication/LoginPage";
import MutasiPage from "./features/mutasi/MutasiPage";
import PrivateRoute from "./components/fragments/Authentication/PrivateRoute";
import { AuthProvider } from "./context/AuthContext"; // Pastikan untuk mengimpor AuthProvider dari file yang benar
import { AccountProvider } from "./context/AccountContext";
import Profile from "./features/profile/Profile";
import { PengaturanLayout } from "./components/layouts/PengaturanLayout";
import { Otp } from "./features/setting/resetPin/Otp";
import { NewPin } from "./features/setting/resetPin/NewPin";
import { PinChangeSuccess } from "./features/setting/resetPin/PinChangeSuccess";


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
          <Route path="/login" element={<LoginPage />} />

          <Route path="/pengaturan" element={<PengaturanLayout />}>
            <Route path="reset-pin">
              <Route path="otp" element={<Otp />} />
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
