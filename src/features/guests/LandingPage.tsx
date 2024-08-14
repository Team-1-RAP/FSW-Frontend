import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import useWindowSize from "../../hooks/useSizeWindows";
import logo from "../../assets/images/logo.png";
import Modal from "../../components/fragments/LandingPage/Modal";
import logoIkx from "../../assets/images/logo-ikx.png";
import jumbotron from "../../assets/images/jumbotron-landing-page.png";
import playStore from "../../assets/images/google-play.png";
import transfer from "../../assets/icons/landing-page/transfer.png";
import rekening from "../../assets/icons/landing-page/detail-rekening.png";
import kelolaUang from "../../assets/icons/landing-page/kelola-uang.png";
import tarikUang from "../../assets/icons/landing-page/tarik-uang.png";
import virtualAcc from "../../assets/icons/landing-page/virtual-acc.png";
import call from "../../assets/icons/landing-page/call.png";
import email from "../../assets/icons/landing-page/email.png";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/login");
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRegisterClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const size = useWindowSize();
    const isMobile = size.width !== undefined && size.width < 768; // Menganggap resolusi mobile kurang dari 768px
    const gradientWidth = isMobile ? 100 : 300;

    return (
        <div className="min-h-screen overflow-hidden bg-white ">
            {/* Header */}
            <header className="flex flex-col justify-between p-3 px-16 bg-white md:items-center md:flex-row">
                <div className="font-bold text-[#1BABB5]">
                    <img
                        src={logo}
                        alt="Simple Bank"
                        aria-label="Simple Bank"
                        className="size-[136px] ml-[-40px] md:ml-0"
                    />
                </div>
                <div className="flex ml-[-40px] md:ml-0">
                    <button
                        className="px-4 py-2 mr-2 text-white rounded-xl bg-[#0079CB] drop-shadow-md w-[120px] h-[40px] md:w-[140px] md:h-[50px]"
                        onClick={handleRegisterClick}
                        aria-label="Tombol Register"
                    >
                        Register
                    </button>
                    <button
                        className="px-4 py-2 text-white rounded-xl bg-[#0079CB] drop-shadow-md w-[120px] h-[40px] md:w-[140px] md:h-[50px]"
                        onClick={handleLoginClick}
                        aria-label="Tombol Login"
                    >
                        Login
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section id="hero" className="w-full h-full md:mt-[-40px] mt-0 ">
                <div className="container z-10 flex flex-col w-11/12 mx-auto md:flex-wrap md:w-3/4 md:mt-10 md:flex-row">
                    <div className="flex md:w-1/2 md:mt-[150px] mt-0 my-10 order-1 md:order-1">
                        <h1 className="text-[#1BABB5] font-bold text-[45px] w-[75%]">
                            Kelola Finansialmu dengan Mudah
                        </h1>
                    </div>
                    <div className="flex order-4 md:order-2 md:w-1/2"></div>
                    <div className="flex md:w-1/2  md:mt-[-30px] mt-[20px] my-10 flex-col space-y-1 order-3 md:order-3">
                        <p
                            className="text-[33px] font-medium"
                            aria-label="Aplikasi mobile banking yang simpel, aman, dan
                            terpercaya. Simple Bank"
                        >
                            Aplikasi mobile banking yang simpel, aman, dan
                            terpercaya.{" "}
                            <span className="text-[#1BABB5] font-bold">
                                Simple{" "}
                            </span>
                            <span className="text-[#1454FB]">Bank</span>
                        </p>
                        <p
                            className="text-[28px] font-medium md:pt-0 pt-4 w-[80%] md:w-full"
                            aria-label="Dapatkan aplikasi dengan mengunduh"
                        >
                            Dapatkan aplikasi dengan mengunduh{" "}
                        </p>
                        <div className="flex items-start">
                            <img
                                src={playStore}
                                alt="Google Play"
                                aria-label="Google Play Store"
                                className="mt-[30px] md:mt-[50px]"
                            />
                        </div>
                    </div>
                    <div className="flex order-2 md:w-1/2 md:order-4">
                        <img
                            src={jumbotron}
                            alt="Gambar Hero Section"
                            aria-label="Gambar Hero Section"
                            className="flex md:absolute md:top-0 md:right-0 object-cover md:mt-[160px] mt-0 md:w-[40%] w-full"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-10 mt-[55px] flex flex-col">
                <div className="flex items-center justify-center">
                    <h2
                        className="mb-20 text-[40px] font-bold text-center text-[#1BABB5] md:w-[40%] w-[80%] md:leading-loose leading-normal"
                        aria-label="Tersedia Fitur Yang Memudahkan Pengguna Simple Bank"
                    >
                        Tersedia Fitur Yang Memudahkan Pengguna Simple Bank
                    </h2>
                </div>
                <div className="relative overflow-hidden">
                    {/* Left Fade Overlay */}
                    <div className="absolute inset-y-0 left-0 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                    {/* Right Fade Overlay */}
                    <div className="absolute inset-y-0 right-0 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
                    <Marquee
                        speed={30}
                        gradient={true}
                        gradientColor="white"
                        gradientWidth={gradientWidth}
                    >
                        <div className="flex space-x-[40px] md:space-x-[140px]">
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="bg-[#A9CFFF] size-[150px] border-1 rounded-full flex justify-center items-center">
                                    <img
                                        src={rekening}
                                        alt="Detail Rekening"
                                        aria-label="Detail Rekening"
                                        className="w-[100px] h-[75px] "
                                    />
                                </div>
                                <p
                                    className="mt-1 font-bold font-2xl"
                                    aria-label="Detail Rekening"
                                >
                                    Detail Rekening
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="bg-[#A9CFFF] size-[150px] border-1 rounded-full flex justify-center items-center">
                                    <img
                                        src={tarikUang}
                                        alt="Tarik Uang"
                                        aria-label="Tarik Uang"
                                        className="w-[100px] h-[100px]"
                                    />
                                </div>
                                <p
                                    className="mt-1 font-bold font-2xl"
                                    aria-label="Tarik Uang"
                                >
                                    Tarik Uang
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="bg-[#A9CFFF] size-[150px] border-1 rounded-full flex justify-center items-center">
                                    <img
                                        src={transfer}
                                        alt="Transfer"
                                        aria-label="Transfer"
                                        className="w-[100px] h-[100px]"
                                    />
                                </div>
                                <p
                                    className="mt-1 font-bold font-2xl"
                                    aria-label="Transfer"
                                >
                                    Transfer
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="bg-[#A9CFFF] size-[150px] border-1 rounded-full flex justify-center items-center">
                                    <img
                                        src={virtualAcc}
                                        alt="Virtual Account"
                                        aria-label="Virtual Account"
                                        className="w-[90px] h-[75px]"
                                    />
                                </div>
                                <p
                                    className="mt-1 font-bold font-2xl"
                                    aria-label="Virtual Account"
                                >
                                    Virtual Account
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="bg-[#A9CFFF] size-[150px] border-1 rounded-full flex justify-center items-center">
                                    <img
                                        src={kelolaUang}
                                        alt="Kelola Uang"
                                        aria-label="Kelola Uang"
                                        className="w-[100px] h-[75px]"
                                    />
                                </div>
                                <p
                                    className="mt-1 font-bold font-2xl"
                                    aria-label="Kelola Uang"
                                >
                                    Kelola Uang
                                </p>
                            </div>
                        </div>
                    </Marquee>
                </div>
            </section>

            {/* Information Section */}
            <section className="py-20 md:py-40">
                <div className="flex items-center justify-center w-full h-full">
                    <div className="container justify-between block w-11/12 md:w-3/4 md:flex">
                        <div className="w-full space-y-4 text-center md:w-1/3 md:text-start">
                            <h1
                                className="text-[48px] font-medium text-black"
                                aria-label="Informasi Lebih Lanjut?"
                            >
                                Informasi Lebih Lanjut?
                            </h1>
                            <div className="flex flex-col pt-8 space-y-8">
                                <div className="flex flex-row">
                                    <div className="bg-[#E8F2EE] rounded-full size-[50px] justify-center items-center flex">
                                        <img
                                            src={call}
                                            alt="Telepon"
                                            aria-label="Icon Telepon"
                                        />
                                    </div>
                                    <div className="ml-6 text-start">
                                        <p
                                            className="text-xl font-medium"
                                            aria-label="Telepon dengan nomor 021 397 11642"
                                        >
                                            021 397 11642
                                        </p>
                                        <p
                                            className="text-[#8C8B8E] font-medium text-sm"
                                            aria-label="Hotline Simple"
                                        >
                                            Hotline Simple
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="bg-[#E8F2EE] rounded-full size-[50px] justify-center items-center flex">
                                        <img
                                            src={email}
                                            alt="Telepon"
                                            aria-label="Icon Email"
                                        />
                                    </div>
                                    <div className="ml-6 text-start">
                                        <p className="text-xl font-medium">
                                            <a
                                                href="simplebankteams@gmail.com"
                                                className="text-inherit hover:underline"
                                                aria-label="Email simplebankteams@gmail.com"
                                            >
                                                simplebankteams@gmail.com
                                            </a>
                                        </p>
                                        <p
                                            className="text-[#8C8B8E] font-medium text-sm"
                                            aria-label="Support Email"
                                        >
                                            Support Email
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full pt-8 mt-6 space-y-8 md:w-2/4 md:mt-0">
                            <div className="relative overflow-hidden">
                                <input
                                    type="checkbox"
                                    className="absolute inset-x-0 top-0 z-10 w-full h-12 opacity-0 cursor-pointer peer"
                                />
                                <div className="flex h-12 md:w-full w-[90%] items-center pl-5 md:my-0 my-2">
                                    <h1
                                        className="text-xl font-medium"
                                        aria-label="Bagaimana cara membuka rekening?"
                                    >
                                        Bagaimana cara membuka rekening
                                        SimpleBank?
                                    </h1>
                                </div>
                                <div className="absolute my-2 transition-transform duration-500 -rotate-90 right-3 top-3 peer-checked:rotate-90 md:my-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </div>
                                <div className="overflow-hidden transition-all duration-500 bg-white max-h-0 peer-checked:max-h-40">
                                    <div className="p-5 ">
                                        <p
                                            className="text-lg font-regular"
                                            aria-label="Saat ini, pembukaan rekening dapat dilakukan dengan mendatangi kantor cabang terdekat. Nantikan fitur pembukaan rekening secara online ya."
                                        >
                                            Saat ini, pembukaan rekening
                                            SimpleBank dapat dilakukan dengan
                                            mendatangi kantor cabang terdekat.
                                            Nantikan fitur pembukaan rekening
                                            secara online ya.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full border-b-2 bg-[#E8E8E8]"></div>
                            <div className="relative overflow-hidden">
                                <input
                                    type="checkbox"
                                    className="absolute inset-x-0 top-0 z-10 w-full opacity-0 cursor-pointer h-14 peer"
                                />
                                <div className="flex h-16 md:w-full w-[80%] items-center pl-5 md:my-0 my-2">
                                    <h1
                                        className="text-xl font-medium"
                                        aria-label="Bagaimana saya bisa mendapatkan aplikasi mobile SimpleBank?"
                                    >
                                        Bagaimana saya bisa mendapatkan aplikasi
                                        mobile SimpleBank?
                                    </h1>
                                </div>
                                <div className="absolute my-2 transition-transform duration-500 -rotate-90 right-3 top-3 peer-checked:rotate-90 md:my-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </div>
                                <div className="overflow-hidden transition-all duration-500 bg-white max-h-0 peer-checked:max-h-40">
                                    <div className="p-5 ">
                                        <p
                                            className="text-lg font-regular"
                                            aria-label="Kamu bisa mendapatkan aplikasi mobile SimpleBank melalui Google Play Store. Lalu, login dengan akun SimpleBank yang telah kamu punya untuk dapat mengakses layanan digital yang lebih lengkap."
                                        >
                                            Kamu bisa mendapatkan aplikasi
                                            mobile SimpleBank melalui Google
                                            Play Store. Lalu, login dengan akun
                                            SimpleBank yang telah kamu punya
                                            untuk dapat mengakses layanan
                                            digital yang lebih lengkap.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full border-b-2 bg-[#E8E8E8]"></div>
                            <div className="relative overflow-hidden ">
                                <input
                                    type="checkbox"
                                    className="absolute inset-x-0 top-0 z-10 w-full h-12 opacity-0 cursor-pointer peer"
                                />
                                <div className="flex h-12 md:w-full w-[80%] items-center pl-5 md:my-0 my-2">
                                    <h1
                                        className="text-xl font-medium"
                                        aria-label="Apakah saya bisa memiliki dua akun SimpleBank?"
                                    >
                                        Apakah saya bisa memiliki dua akun
                                        SimpleBank?
                                    </h1>
                                </div>
                                <div className="absolute my-2 transition-transform duration-500 -rotate-90 right-3 top-3 peer-checked:rotate-90 md:my-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </div>
                                <div className="overflow-hidden transition-all duration-500 bg-white max-h-0 peer-checked:max-h-40">
                                    <div className="p-5 ">
                                        <p
                                            className="text-lg font-regular"
                                            aria-label="Kamu hanya bisa memiliki satu akun SimpleBank. Tapi tenang saja, karena dalam 1 akun tersebut kamu bisa mengakses banyak rekening yang kamu punya."
                                        >
                                            Kamu hanya bisa memiliki satu akun
                                            SimpleBank. Tapi tenang saja, karena
                                            dalam 1 akun tersebut kamu bisa
                                            mengakses banyak rekening yang kamu
                                            punya.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-white bg-gradient-to-tr to-[#2FA6FC] via-[#1454FB] from-[#1F5292] h-full">
                <div className="flex flex-col md:justify-center p-10 md:ml-[120px] py-20 justify-start ">
                    <img
                        src={logoIkx}
                        alt="Simple Bank"
                        aria-label="Logo Simple Bank"
                        className="w-[51px] h-[61px] mb-10"
                    />
                    <p aria-label="Simple bank">
                        Simple bank adalah pelaku jasa keuangan terdaftar dan
                        diawasi oleh Otoritas Jasa Keuangan
                    </p>
                    <p aria-label="Copyright 2024 - Simple Bank">
                        Copyright © 2024 - Simple Bank
                    </p>
                </div>
            </footer>
            {isModalOpen && <Modal onClose={handleCloseModal} />}
        </div>
    );
};

export default LandingPage;
