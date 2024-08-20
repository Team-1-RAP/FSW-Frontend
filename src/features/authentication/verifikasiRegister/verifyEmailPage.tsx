import { Link } from "react-router-dom";

const VerifyEmailPage: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-[340px] mb-20">
                <h1 className="text-[28px] font-medium">Registrasi Akun</h1>
                <p className="mt-6 text-sm font-medium text-center w-[300px]">
                    Masukan kode OTP yang telah dikirimkan melalui Email ke
                    <span className="text-[#1454FB]">
                        {" "}
                        randyrundy@gmail.com
                    </span>
                </p>
                <form className="w-full mt-8 space-y-6">
                    <div className="space-y-1">
                        <input
                            type="number"
                            id="KodeOTP"
                            placeholder="Kode OTP"
                            className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                        />
                    </div>
                    <div className="flex flex-row w-full space-x-4 text-base font-bold">
                        <Link
                            to="/register"
                            className="py-3 border-[#055287] rounded-lg text-[#055287] w-1/2 border text-center"
                        >
                            Kembali
                        </Link>
                        <button
                            type="submit"
                            className="py-3 bg-[#055287] rounded-lg text-white w-1/2"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default VerifyEmailPage;
