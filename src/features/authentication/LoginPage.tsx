import React, { useState } from "react";
import { User, Lock, EyeOff, Eye } from "react-feather";
import logo from "../../assets/images/logo.png";
import bgLogin from "../../assets/images/bgLogin.png";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
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
        <div className="relative">
            <div className="">
                <img
                    src={bgLogin}
                    alt=""
                    className="absolute left-0 object-cover w-full h-screen md:h-full md:w-fit"
                />
            </div>
            <div className="flex flex-col w-full md:h-screen md:flex-row">
                <div className="relative w-full h-screen md:w-1/2">
                    <div className="absolute flex flex-col mb-40 md:items-center md:justify-center left-5 top-4 md:inset-0 ">
                        <div className="md:space-y-10 space-y-16 text-white md:w-[75%] w-full">
                            <p className="text-[59px] mr-8 md:mr-0">
                                Selamat Datang di <b>Simple Bank</b>
                            </p>
                            <p className="text-[27px] mr-8 md:mr-0">
                                <b>Login</b> untuk akses akun <b>Simple Bank</b>{" "}
                                mu
                            </p>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end md:ml-[36px] m-5 md:mb-[52px] text-white space-y-4 md:space-y-0">
                        <p className="mr-[100px] md:mr-0">
                            Simple bank adalah pelaku jasa keuangan terdaftar
                            dan diawasi oleh Otoritas Jasa Keuangan
                        </p>
                        <p>Copyright © 2024 - Simple Bank</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-screen md:w-1/2">
                    <img
                        src={logo}
                        alt="Simple Bank"
                        className="w-[194px] mb-[29px]"
                    />
                    <form
                        onSubmit={handleSubmit}
                        className="w-11/12 space-y-3 md:w-1/2"
                    >
                        <div className="relative">
                            <User className="text-[#c4c4c4] absolute left-2 top-3" />
                            <input
                                type="text"
                                placeholder="your account"
                                className="border rounded-md border-[#c4c4c4] py-[10px] pl-[40px] pr-[10px] w-full"
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
                                className="border rounded-md border-[#c4c4c4] py-[10px] px-[40px] w-full"
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
                        {error && (
                            <div className="text-sm text-red-500">{error}</div>
                        )}
                        <p className="flex justify-end text-[#153193]">
                            <span>
                                forgot your <b>password?</b>
                            </span>
                        </p>
                        <div className="border border-[#6C8FEE] w-full"></div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="mb-[100px] mt-[111px] bg-gradient-to-tr to-[#2AF0FA] from-[#0C32FB] py-[10px] px-[60px] rounded-[12px] text-white text-base border-[#5375EC] border-2"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
