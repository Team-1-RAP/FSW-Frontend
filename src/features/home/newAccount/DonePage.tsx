import React from "react";
import FinishPage from "../../../components/fragments/Pages/FinishPage";

const DonePage: React.FC = () => {
    return (
        <FinishPage
            path="/home"
            buttonText="Kembali ke Beranda"
            title="Permintaan Pembukaan Rekening Berhasil Dikirim"
            message="Saat ini, data Anda sedang kami lakukan verifikasi. Harap tunggu email konfirmasi dari SimpleBank untuk tahapan berikutnya."
        />
    );
};

export default DonePage;
