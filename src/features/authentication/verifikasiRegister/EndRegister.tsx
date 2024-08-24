import React from "react";
import FinishPage from "../../../components/fragments/Pages/FinishPage";

const EndRegister: React.FC = () => {
    return (
        <FinishPage
            path="/login"
            buttonText="Login"
            title="Permintaan Pembukaan Rekening Berhasil Dikirim"
            message="Saat ini, data Anda sedang kami lakukan verifikasi. Harap tunggu email konfirmasi dari SimpleBank untuk tahapan berikutnya."
        />
    );
};

export default EndRegister;
