import React from "react";
import { useNavigate } from "react-router-dom";

import bgPopUp from "../../../assets/images/bg-pop-up.png";

interface ModalProps {
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleOverlayClick}
        >
            <div className="relative p-20 bg-white rounded-lg">
                <button
                    className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 size-8"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="flex flex-col items-center text-center">
                    <img
                        src={bgPopUp}
                        alt="Registration Successful"
                        className="w-1/2 mb-4"
                    />
                    <p className="mb-4 text-xl ">
                        Registrasi akun SimpleBank Anda sudah dibuat
                        <br />
                        Silahkan untuk login ke akun Anda.
                    </p>
                    <button
                        onClick={handleLoginClick}
                        className="px-4 py-2 text-white rounded bg-[#549EFF] w-[135px] mt-8"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
