import Navbar from "../fragments/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";

const NewAccountLayout = () => {
    const location = useLocation();

    const noHeaderPaths = ["/new-account/new-pin", "/new-account/success"];

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
                                        { step: 1, path: "#" },
                                        {
                                            step: 2,
                                            path: "#",
                                        },
                                        {
                                            step: 3,
                                            path: "/new-account/",
                                        },
                                        { step: 4, path: "/new-account/biodata" },
                                        {
                                            step: 5,
                                            path: "#",
                                        },
                                        { step: 6, path: "/new-account/finish" },
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
                                        <div className={`text-center md:text-left ${getLinkClass("/#").text}`}>1. Registrasi Akun</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/#").underline}`} style={{ height: "2px" }} aria-hidden />
                                    </div>
                                    <div className="relative flex items-center justify-center flex-1 md:justify-start">
                                        <div className={`text-center md:text-left ${getLinkClass("#").text}`}>2. Verifikasi Email</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("#").underline}`} style={{ height: "2px" }} aria-hidden />
                                    </div>
                                    <div className="relative flex items-center justify-center flex-1 md:justify-start">
                                        <div className={`text-center md:text-left ${getLinkClass("/new-account/").text}`}>3. Pilih Jenis Rekening</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/new-account/").underline}`} style={{ height: "2px" }} aria-hidden />
                                    </div>
                                    <div className="relative flex items-center justify-center flex-1 md:justify-start">
                                        <div className={`text-center md:text-left ${getLinkClass("/new-account/biodata").text}`}>4. Masukkan Data Diri</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/new-account/biodata").underline}`} style={{ height: "2px" }} aria-hidden />
                                    </div>
                                    <div className="relative flex items-center justify-center flex-1 md:justify-start">
                                        <div className={`text-center md:text-left ${getLinkClass("#").text}`}>5. Upload Dokumen Persyaratan</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("#").underline}`} style={{ height: "2px" }} aria-hidden />
                                    </div>
                                    <div className="relative flex items-center justify-center flex-1 md:justify-start">
                                        <div className={`text-center md:text-left ${getLinkClass("/new-account/finish").text}`}>6. Selesai</div>
                                        <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/new-account/finish").underline}`} style={{ height: "2px" }} aria-hidden />
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

export default NewAccountLayout;
