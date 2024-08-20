import { Eye } from "react-feather";
import { Link } from "react-router-dom";
const RegisterPage: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-[340px] mb-10">
                <h1 className="text-[28px] font-medium">Registrasi Akun</h1>
                <form className="w-full mt-8 space-y-6">
                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="block text-xs font-light"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="username"
                            className="block text-xs font-light"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                        />
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="password"
                            className="block text-xs font-light"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                            />
                            <button
                                type="button"
                                className={`absolute right-2 inset-y-0 text-[#C4C4C4]`}
                            >
                                <Eye />
                            </button>
                        </div>
                        <div className="text-[#718EBF] text-[10px] font-light px-2 mt-1">
                            <p>Minimal 8 karakter</p>
                            <p>Minimal terdapat 1 huruf kapital</p>
                            <p>Minimal terdapat 1 angka</p>
                            <p>Minimal terdapat 1 simbol</p>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label
                            htmlFor="KonfirmasiPassword"
                            className="block text-xs font-light"
                        >
                            Konfirmasi Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="KonfirmasiPassword"
                                placeholder="Konfirmasi Password"
                                className="w-full p-3 border rounded-lg border-[#C4C4C4]"
                            />
                            <button
                                type="button"
                                className={`absolute right-2 inset-y-0 text-[#C4C4C4]`}
                            >
                                <Eye />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row w-full space-x-4 text-base font-bold">
                        <Link
                            to="/"
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
export default RegisterPage;
