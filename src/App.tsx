import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./features/guests/LandingPage";
import NotFound from "./features/NotFound";
import HomePage from "./features/home/HomePage";
import LoginPage from "./features/authentication/LoginPage";
import MutationPage from "./features/mutation/MutationPage";
import SettingPage from "./features/setting/SettingPage";
import PrivateRoute from "./components/fragments/Authentication/PrivateRoute";
import { AuthProvider } from "./context/AuthContext"; // Pastikan untuk mengimpor AuthProvider dari file yang benar
import { AccountProvider } from "./context/AccountContext";
import Profile from "./features/profile/Profile";
import { MutationProvider } from "./context/MutationContext";
import BuktiTransferPage from "./features/home/transfer/BuktiTransferPage";
import ConfirmTransferPage from "./features/home/transfer/ConfirmTransferPage";
import NewTransferPage from "./features/home/transfer/NewTransferPage";
import NominalTransferPage from "./features/home/transfer/NominalTransferPage";
import TransferPage from "./features/home/transfer/TransferPage";

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

                    <Route path="/test" element={<Profile />} />

                    {/* HomePage - Private Route */}
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <AccountProvider>
                                    <MutationProvider>
                                        <HomePage />
                                    </MutationProvider>
                                </AccountProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/transfer"
                        element={
                            <PrivateRoute>
                                <AccountProvider>
                                    <MutationProvider>
                                        <TransferPage />
                                    </MutationProvider>
                                </AccountProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="home/transfer/new"
                        element={
                            <PrivateRoute>
                                <AccountProvider>
                                    <MutationProvider>
                                        <NewTransferPage />
                                    </MutationProvider>
                                </AccountProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/home/transfer/nominal"
                        element={
                            <PrivateRoute>
                                <AccountProvider>
                                    <MutationProvider>
                                        <NominalTransferPage />
                                    </MutationProvider>
                                </AccountProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/home/transfer/confirm"
                        element={
                            <PrivateRoute>
                                <AccountProvider>
                                    <MutationProvider>
                                        <ConfirmTransferPage />
                                    </MutationProvider>
                                </AccountProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/home/transfer/success"
                        element={
                            <PrivateRoute>
                                <AccountProvider>
                                    <MutationProvider>
                                        <BuktiTransferPage />
                                    </MutationProvider>
                                </AccountProvider>
                            </PrivateRoute>
                        }
                    />

                    {/* MutasiPage - Private Route */}
                    <Route
                        path="/mutasi"
                        element={
                            <PrivateRoute>
                                <AccountProvider>
                                    <MutationProvider>
                                        <MutationPage />
                                    </MutationProvider>
                                </AccountProvider>
                            </PrivateRoute>
                        }
                    />

                    {/* SettingPage - Private Route */}
                    <Route
                        path="/pengaturan"
                        element={
                            <PrivateRoute>
                                <AccountProvider>
                                    <MutationProvider>
                                        <SettingPage />
                                    </MutationProvider>
                                </AccountProvider>
                            </PrivateRoute>
                        }
                    />

                    {/* Profile - Private Route */}
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <AccountProvider>
                                    <MutationProvider>
                                        <Profile />
                                    </MutationProvider>
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
