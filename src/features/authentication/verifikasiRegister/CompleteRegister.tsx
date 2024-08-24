import React from "react";
import Success from "../../../components/fragments/Pages/Success";

const SuccessPage: React.FC = () => {
    return <Success path="/login" buttonText="Login" title="Selamat! Rekening SimpleBank Anda berhasil dibuat" message="Anda bisa mengakses layanan SimpleBank melalui aplikasi versi Android dan Website" icon={"check"} />;
};

export default SuccessPage;
