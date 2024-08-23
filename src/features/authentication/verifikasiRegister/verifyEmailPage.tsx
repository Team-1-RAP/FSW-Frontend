import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterContext } from "../../../context/RegisterContext";

const VerifyEmailPage: React.FC = () => {
    const context = useContext(RegisterContext);
    const navigate = useNavigate();

    const [otpInput, setOtpInput] = useState<string>("");
    const [error, setError] = useState<string | null>(null); // State to handle error messages

    // Handle case where context is not available
    if (!context) {
        return <div>Loading...</div>;
    }

    const { email, otp } = context;

    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (otpInput === otp) {
            navigate("/register/tipe-rekening");
        } else {
            setError("Kode OTP yang Anda masukkan salah.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-[340px] mb-20">
            <h1 className="text-[28px] font-medium">Registrasi Akun</h1>
            <p className="mt-6 text-sm font-medium text-center w-[300px]">
                Masukkan kode OTP yang telah dikirimkan melalui Email ke
                <span className="text-[#1454FB]"> {email}</span>
            </p>
            <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-1">
                    <input type="number" id="KodeOTP" placeholder="Kode OTP" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} className="w-full p-3 border rounded-lg border-[#C4C4C4]" />
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                <div className="flex flex-row w-full space-x-4 text-base font-bold">
                    <Link to="/register" className="py-3 border-[#055287] rounded-lg text-[#055287] w-1/2 border text-center">
                        Kembali
                    </Link>
                    <button type="submit" className="py-3 bg-[#055287] rounded-lg text-white w-1/2">
                        Selanjutnya
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VerifyEmailPage;
