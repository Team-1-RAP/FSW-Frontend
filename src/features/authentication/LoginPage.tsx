import React from "react";
import { User, Lock, EyeOff } from "react-feather";
import logo from "../../assets/images/logo.png";
import bgLogin from "../../assets/images/bgLogin.png";

const LoginPage: React.FC = () => {
    return (
        <div className="relative">
            <div className="">
                <img src={bgLogin} alt="" className="absolute left-0 h-full" />
            </div>
            <div className="flex flex-row w-full h-screen">
                <div className="relative w-1/2 h-screen">
                    <div className="absolute inset-0 flex flex-col items-center justify-center mb-40 ">
                        <div className="w-[75%] space-y-10 text-white">
                            <p className="text-[59px]">
                                Selamat Datang di <b>Simple Bank</b>
                            </p>
                            <p className="text-[27px]">
                                <b>Login</b> untuk akses akun <b>Simple Bank</b>{" "}
                                mu
                            </p>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end ml-[36px] mb-[52px] text-white">
                        <p>
                            Simple bank adalah pelaku jasa keuangan terdaftar
                            dan diawasi oleh Otoritas Jasa Keuangan
                        </p>
                        <p>Copyright © 2024 - Simple Bank</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 h-screen">
                    <img
                        src={logo}
                        alt="Simple Bank"
                        className="w-[194px] mb-[29px]"
                    />
                    <form action="" className="w-1/2 space-y-3">
                        <div className="relative">
                            <User className="text-[#c4c4c4] absolute left-2 top-3" />
                            <input
                                type="text"
                                placeholder="your account"
                                className="border rounded-md border-[#c4c4c4] py-[10px] pl-[40px] pr-[10px] w-full"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="text-[#c4c4c4] absolute left-2 top-3" />
                            <input
                                type="password"
                                placeholder="password"
                                className="border rounded-md border-[#c4c4c4] py-[10px] px-[40px] w-full"
                            />
                            <EyeOff className="text-[#c4c4c4] absolute right-4 top-3" />
                        </div>
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
