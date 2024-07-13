// src/components/LoginForm.tsx
import React, { useState } from "react";
import { User, Lock, EyeOff, Eye } from "react-feather";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const validateInput = () => {
        const usernamePattern = /^[a-z0-9]+$/;
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        if (!username) {
            setError("Username wajib diisi!");
            return false;
        }
        if (!usernamePattern.test(username)) {
            setError(
                "Username harus huruf kecil dan hanya berisi huruf dan angka"
            );
            return false;
        }
        if (!password) {
            setError("Password harus diisi");
            return false;
        }
        if (!passwordPattern.test(password)) {
            setError("Kombinasi password belum sesuai");
            return false;
        }

        setError("");
        return true;
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateInput()) {
            try {
                const response = await fetch(
                    "https://cautious-noelyn-ridho-71c54445.koyeb.app/api/v1/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username, password }),
                    }
                );
                if (!response) {
                    setError("Login Gagal");
                }
                const data = await response.json();
                if (data) {
                    localStorage.setItem("token", data.data.accessToken);
                    navigate("/home");
                } else {
                    setError("Kredensial tidak sesuai");
                }
            } catch (error) {
                setError("An error occurred during login");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-11/12 space-y-3 md:w-1/2">
            <div className="relative">
                <User className="text-[#c4c4c4] absolute left-2 top-3" />
                <input
                    type="text"
                    placeholder="your account"
                    className="border rounded-md border-[#c4c4c4] py-[10px] pl-[40px] pr-[10px] w-full focus:outline-[#5375EC]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-label="Username, hanya huruf kecil dan angka diperbolehkan"
                />
            </div>
            <div className="relative">
                <Lock className="text-[#c4c4c4] absolute left-2 top-3" />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    className="border rounded-md border-[#c4c4c4] py-[10px] px-[40px] w-full focus:outline-[#5375EC] "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="password"
                />
                <div
                    className="absolute cursor-pointer right-4 top-3"
                    onClick={toggleShowPassword}
                >
                    {showPassword ? (
                        <Eye className="text-[#c4c4c4]" />
                    ) : (
                        <EyeOff className="text-[#c4c4c4]" />
                    )}
                </div>
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
            <p className="flex justify-end text-[#153193]">
                <span>
                    forgot your <b>password?</b>
                </span>
            </p>
            <div className="border border-[#6C8FEE] w-full"></div>
            <div className="flex justify-center">
                <Button type="submit" className="mb-[100px] mt-[111px]">
                    Login
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
