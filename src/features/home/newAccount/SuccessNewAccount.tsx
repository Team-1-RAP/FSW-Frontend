import React from "react";
import Success from "../../../components/fragments/Pages/Success";

const FinishNewAccount: React.FC = () => {
    return (
        <Success
            path="/home"
            buttonText="Ok, Mengerti"
            title="Permintaan Pembukaan Rekening Berhasil Dikirim"
            message="Saat ini, data Anda sedang kami lakukan verifikasi. Harap tunggu email konfirmasi dari SimpleBank untuk tahapan berikutnya."
            icon={"clock"}
        />
    );
};

export default FinishNewAccount;
