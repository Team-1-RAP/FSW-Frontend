import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import LandingPage from "./features/guests/LandingPage"
import NotFound from "./features/NotFound"
import HomePage from "./features/home/HomePage"
import LoginPage from "./features/authentication/LoginPage"
import MutasiPage from "./features/mutasi/MutasiPage"
import SettingPage from "./features/setting/SettingPage"
import PrivateRoute from "./components/fragments/Authentication/PrivateRoute"
import { AuthProvider } from "./context/AuthContext" // Ensure AuthProvider is correctly imported
import { AccountProvider } from "./context/AccountContext"
import Profile from "./features/profile/Profile"
import NewTransferPage from "./features/home/transfer/NewTransferPage"
import NominalTransferPage from "./features/home/transfer/NominalTransferPage"
import ConfirmTransferPage from "./features/home/transfer/ConfirmTransferPage"
import BuktiTransferPage from "./features/home/transfer/BuktiTransferPage"
import TransferPage from "./features/home/transfer/TransferPage"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* LandingPage - Public Route */}
          <Route path="/" element={<LandingPage />} />

          {/* LoginPage - Public Route */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/test" element={<Profile />} />

          {/* HomePage - Private Route */}
          <Route path="/home">
            <Route
              path=""
              element={
                <PrivateRoute>
                  <AccountProvider>
                    <HomePage />
                  </AccountProvider>
                </PrivateRoute>
              }
            />
            {/* TransferPage*/}
            <Route path="transfer">
              <Route path="" element={<TransferPage />} />
              <Route path="new" element={<NewTransferPage />} />
              <Route path="nominal" element={<NominalTransferPage />} />
              <Route path="confirm" element={<ConfirmTransferPage />} />
              <Route path="success" element={<BuktiTransferPage />} />
            </Route>
          </Route>

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
          <Route
            path="/pengaturan"
            element={
              <PrivateRoute>
                <SettingPage />
              </PrivateRoute>
            }
          />

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
