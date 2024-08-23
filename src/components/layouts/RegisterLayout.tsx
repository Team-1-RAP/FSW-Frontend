import Navbar from "../fragments/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";

const RegisterLayout = () => {
    const location = useLocation();

    const noHeaderPaths = ["/register/new-pin", "/register/success"];

    const shouldShowHeader = !noHeaderPaths.includes(location.pathname);

    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? {
                  text: "text-blue-400",
                  underline: "border-[1.5px] rounded-t border-blue-700 bg-blue-100",
              }
            : { text: "text-[#838383]", underline: "" };
    };

    return (
        <div className="flex flex-col h-screen md:flex-row">
            {/* Navbar */}
            <Navbar showGreeting={false} showSearchBar={false} showHelpButton={false} showLogoutButton={false} />
            <div className="flex-1 bg-gray-50">
                {shouldShowHeader && (
                    <div className="pb-6 mx-4 mt-10 bg-white rounded-lg md:mx-7 md:mt-28">
                        <div className="px-4 pt-32 md:px-6 md:pt-10">
                            <header className="border-b border-[#A09FA4] h-auto pb-2 md:pb-0">
                                {/* Mobile Layout: Stepper with Circles */}
                                <div className="flex justify-center gap-4 md:hidden">
                                    {[
                                        { step: 1, path: "/register" },
                                        {
                                            step: 2,
                                            path: "/register/verifikasi-email",
                                        },
                                        {
                                            step: 3,
                                            path: "/register/tipe-rekening",
                                        },
                                        { step: 4, path: "/register/data-diri" },
                                        {
                                            step: 5,
                                            path: "/register/upload-persyaratan",
                                        },
                                        { step: 6, path: "/register/selesai" },
                                    ].map(({ step, path }) => (
                                        <Link
                                            key={step}
                                            to={path}
                                            className={`flex items-center justify-center w-8 h-8 text-white rounded-full border ${location.pathname === path ? "bg-blue-500 border-blue-700" : "bg-gray-200 border-[#A09FA4]"}`}
                                        >
                                            {step}
                                        </Link>
                                    ))}
                                </div>

                                {/* Desktop Layout: Full Steps with Labels */}
                                <div className="hidden md:flex md:flex-row md:gap-16">
                                    <div className="relative flex items-center justify-center md:justify-start">
                                        <div className={`text-center md:text-left ${getLinkClass("/register").text}`}>1. Registrasi Akun</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register").underline}`} style={{ height: "2px" }} aria-hidden />
                                    </div>
                                    <div className="relative flex items-center justify-center flex-1 md:justify-start">
                                        <div className={`text-center md:text-left ${getLinkClass("/register/verifikasi-email").text}`}>2. Verifikasi Email</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register/verifikasi-email").underline}`} style={{ height: "2px" }} aria-hidden />
                                    </div>
                                    <div className="relative flex items-center justify-center flex-1 md:justify-start">
                                        <div className={`text-center md:text-left ${getLinkClass("/register/tipe-rekening").text}`}>3. Pilih Jenis Rekening</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register/tipe-rekening").underline}`} style={{ height: "2px" }} aria-hidden />
                                    </div>
                                    <div className="relative flex items-center justify-center flex-1 md:justify-start">
                                        <div className={`text-center md:text-left ${getLinkClass("/register/data-diri").text}`}>4. Masukkan Data Diri</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register/data-diri").underline}`} style={{ height: "2px" }} aria-hidden />
                                    </div>
                                    <div className="relative flex items-center justify-center flex-1 md:justify-start">
                                        <div className={`text-center md:text-left ${getLinkClass("/register/upload-persyaratan").text}`}>5. Upload Dokumen Persyaratan</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register/upload-persyaratan").underline}`} style={{ height: "2px" }} aria-hidden />
                                    </div>
                                    <div className="relative flex items-center justify-center flex-1 md:justify-start">
                                        <div className={`text-center md:text-left ${getLinkClass("/register/selesai").text}`}>6. Selesai</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register/selesai").underline}`} style={{ height: "2px" }} aria-hidden />
                                    </div>
                                </div>
                            </header>
                        </div>
                        {/* Main */}
                        <main className="flex justify-center mt-6 md:mt-10">
                            <Outlet />
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterLayout;
