import React, { useCallback, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import bgLogin from "../../assets/images/bgLogin.png";
import LoginForm from "../../components/fragments/Authentication/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useIdleTimer from "../../hooks/useIdleTimer";
import Modal from "../../components/fragments/Modal";
import { useToggle } from "../../hooks/useToggle";

const LoginPage: React.FC = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");

        if (token && storedToken) {
            navigate("/home");
        }
    }, [token, navigate]);

    useIdleTimer(() => {
        logout();
        navigate("/login");
    }, 10 * 60 * 1000);

    const [isModalVisible, toggleModal] = useToggle(false);

    const handleOpenModal = useCallback(() => toggleModal(), [toggleModal]);
    const handleCloseModal = useCallback(() => toggleModal(), [toggleModal]);
    const handleButtonClick = useCallback(() => {
        navigate("/ubah-password");
        handleCloseModal();
    }, [navigate, handleCloseModal]);

    const handleLoginError = (status: number) => {
        if (status === 403) {
            handleOpenModal();
        }
    };

    return (
        <div className="relative">
            <div className=""></div>
            <div className="flex flex-col w-full md:h-screen md:flex-row">
                <div className="relative w-full h-screen md:w-1/2">
                    <img src={bgLogin} alt="" className="absolute left-0 overflow-hidden max-h-screen min-w-[50vw] w-full h-screen md:h-full md:w-full sm:w-[100vw]" />
                    <div className="absolute flex flex-col mb-40 md:items-center md:justify-center left-5 top-4 md:inset-0 ">
                        <div className="md:space-y-10 space-y-16 text-white md:w-[75%] w-full">
                            <p className="text-[59px] mr-8 md:mr-0">
                                Selamat Datang di <b>Simple Bank</b>
                            </p>
                            <p className="text-[27px] mr-8 md:mr-0">
                                <b>Login</b> untuk akses akun <b>Simple Bank</b> mu
                            </p>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end md:ml-[36px] m-5 md:mb-[52px] text-white space-y-4 md:space-y-0">
                        <p className="mr-[100px] md:mr-0">Simple bank adalah pelaku jasa keuangan terdaftar dan diawasi oleh Otoritas Jasa Keuangan</p>
                        <p>Copyright © 2024 - Simple Bank</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-screen md:w-1/2">
                    <img src={logo} alt="Simple Bank Logo" aria-label="Simple Bank Logo" className="w-[194px] mb-[29px]" />
                    <LoginForm onLoginError={handleLoginError} />
                    <div className="p-6">
                        <Modal
                            visible={isModalVisible}
                            title="Password sedang terblokir"
                            description="Yuk, ubah password terlebih dahulu untuk dapat kembali mengakses akun Anda"
                            buttonLabel="Ubah Password"
                            onButtonClick={handleButtonClick}
                            onClose={handleCloseModal}
                            ariaDescribedBy="password-blocked-error"
                        />
                        <div id="password-blocked-error" role="alert" aria-live="assertive" className="sr-only">
                            Percobaan sudah 3 kali gagal, Akun anda terblokir!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
