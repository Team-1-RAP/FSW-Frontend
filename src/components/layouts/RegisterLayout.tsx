import Navbar from "../fragments/Navbar"
import { Link, Outlet, useLocation } from "react-router-dom"

const RegisterLayout = () => {
  const location = useLocation()

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? {
          text: "text-blue-400",
          underline: "border-[1.5px] rounded-t border-blue-700",
        }
      : { text: "text-[#838383]", underline: "" }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Navbar */}
      <Navbar showGreeting={false} showSearchBar={false} showHelpButton={false} showLogoutButton={false} />
      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-white rounded-lg mx-4 md:mx-7 mt-10 md:mt-28 pb-6">
          <div className="px-4 md:px-6 pt-32 md:pt-10">
            <header className="border-b border-[#A09FA4] h-auto">
              <div className="flex flex-col md:flex-row gap-4 md:gap-16 px-2 md:px-0">
                <Link to="/register" className="relative border-b md:border-0 border-[#A09FA4] flex-1 flex items-center justify-center md:justify-start">
                  <div className={`text-center md:text-left ${getLinkClass("/register").text}`}>1. Registrasi Akun</div>
                  <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register").underline}`} style={{ height: "2px" }} aria-hidden />
                </Link>
                <Link to="/register/verifikasi-email" className="relative border-b md:border-0 border-[#A09FA4] flex-1 flex items-center justify-center md:justify-start">
                  <div className={`text-center md:text-left ${getLinkClass("/register/verifikasi-email").text}`}>2. Verifikasi Email</div>
                  <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register/verifikasi-email").underline}`} style={{ height: "2px" }} aria-hidden />
                </Link>
                <Link to="/register/tipe-rekening" className="relative border-b md:border-0 border-[#A09FA4] flex-1 flex items-center justify-center md:justify-start">
                  <div className={`text-center md:text-left ${getLinkClass("/register/tipe-rekening").text}`}>3. Pilih Jenis Rekening</div>
                  <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register/tipe-rekening").underline}`} style={{ height: "2px" }} aria-hidden />
                </Link>
                <Link to="/register/data-diri" className="relative border-b md:border-0 border-[#A09FA4] flex-1 flex items-center justify-center md:justify-start">
                  <div className={`text-center md:text-left ${getLinkClass("/register/data-diri").text}`}>4. Masukkan Data Diri</div>
                  <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register/data-diri").underline}`} style={{ height: "2px" }} aria-hidden />
                </Link>
                <Link to="/register/upload-persyaratan" className="relative border-b md:border-0 border-[#A09FA4] flex-1 flex items-center justify-center md:justify-start">
                  <div className={`text-center md:text-left ${getLinkClass("/register/upload-persyaratan").text}`}>5. Upload Dokumen Persyaratan</div>
                  <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register/upload-persyaratan").underline}`} style={{ height: "2px" }} aria-hidden />
                </Link>
                <Link to="/register/selesai" className="relative border-b md:border-0 border-[#A09FA4] flex-1 flex items-center justify-center md:justify-start">
                  <div className={`text-center md:text-left ${getLinkClass("/register/selesai").text}`}>6. Selesai</div>
                  <div className={`absolute bottom-0 left-0 w-full ${getLinkClass("/register/selesai").underline}`} style={{ height: "2px" }} aria-hidden />
                </Link>
              </div>
            </header>
            {/* Main */}
            <main className="flex mt-6 md:mt-10 justify-center">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterLayout
