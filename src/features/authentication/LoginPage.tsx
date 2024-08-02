import React, { useCallback, useEffect } from "react";
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
    <>
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
        <div
          id="password-blocked-error"
          role="alert"
          aria-live="assertive"
          className="sr-only"
        >
          Percobaan sudah 3 kali gagal, Akun anda terblokir!
        </div>
      </div>
    </>
  );
};

export default LoginPage;
