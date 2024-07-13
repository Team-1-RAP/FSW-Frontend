import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./features/guests/LandingPage";
import NotFound from "./features/NotFound";
import HomePage from "./features/home/HomePage";
import LoginPage from "./features/authentication/LoginPage";
import PrivateRoute from "./components/fragments/Authentication/PrivateRoute";
import { AuthProvider } from "./context/AuthContext"; // Pastikan untuk mengimpor AuthProvider dari file yang benar

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

                    {/* HomePage - Private Route */}
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <HomePage />
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
