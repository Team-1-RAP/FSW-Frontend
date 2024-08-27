import React, { useCallback, useEffect } from "react";
import LoginForm from "../../components/fragments/Authentication/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useIdleTimer from "../../hooks/useIdleTimer";
import Modal from "../../components/fragments/Modal";
import { useToggle } from "../../hooks/useToggle";
import { useNotification } from "../../hooks/useNotification";
import { toast, ToastContainer } from "react-toastify";

const LoginPage: React.FC = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const { notificationMessage, clearNotification } = useNotification();

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

    useEffect(() => {
        if (notificationMessage) {
          toast.success(notificationMessage, {
            position: "top-center",
            theme: "colored",
            hideProgressBar: true,
            className: "w-[424px] min-h-[49px] font-semibold font-sans",
          });
        }
        clearNotification();
      }, [clearNotification, notificationMessage]);

    return (
        <>
            <LoginForm onLoginError={handleLoginError} />
            <ToastContainer />
            <div className="p-6">
                <Modal
                    visible={isModalVisible}
                    title="Password sedang terblokir"
                    description="Yuk, ubah password terlebih dahulu untuk dapat kembali mengakses akun Anda"
                    buttonLabel="Ubah Password"
                    onButtonClick={handleButtonClick}
                    onClose={handleCloseModal}
                />
                {isModalVisible && (
                    <div id="password-blocked-error" role="alert" aria-live="assertive" className="sr-only">
                        Percobaan sudah 3 kali gagal, Akun Anda terblokir!
                    </div>
                )}
            </div>
        </>
    );
};

export default LoginPage;
