import React from "react";
import { Clock } from "react-feather";
import { useNavigate } from "react-router-dom";

const FinishPage: React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/");
    };

    return (
        <div className="text-center w-[605px] flex flex-col items-center gap-4">
            <p className="font-medium text-[28px]">
                Permintaan Pembukaan Rekening Berhasil Dikirim
            </p>
            <Clock
                className="text-[#055287] stroke-[3px] rounded-full"
                size={139}
            />
            <p className="text-base font-normal">
                Saat ini, data Anda sedang kami lakukan verifikasi. Harap tunggu
                email konfirmasi dari SimpleBank untuk tahapan berikutnya.
            </p>
            <button
                type="button"
                className="bg-[#0066AE] h-12 rounded-xl text-white hover:bg-sky-900 focus:bg-sky-950 px-5 font-bold"
                onClick={handleButtonClick}
            >
                Ok, Mengerti
            </button>
        </div>
    );
};

export default FinishPage;
