import { useState, useEffect, useMemo } from "react"
import Navbar from "../fragments/Navbar"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import Modal from "../fragments/Modal"

const RegisterLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [initialLoad, setInitialLoad] = useState<boolean>(true)

  const noHeaderPaths = ["/register/new-pin", "/register/success"]
  const modalPaths = useMemo(() => ["/register/tipe-rekening", "/register/data-diri", "/register/upload-persyaratan", "/register/selesai"], [])
  const shouldShowHeader = !noHeaderPaths.includes(location.pathname)

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? {
          text: "text-blue-400",
          underline: "border-[1.5px] rounded-t border-blue-700 bg-blue-100",
        }
      : { text: "text-[#838383]", underline: "" }
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    // Push a new state to ensure proper browser history management
    window.history.pushState(null, "", location.pathname)
  }

  const handleModalConfirm = () => {
    setIsModalVisible(false)
    navigate("/register", { replace: true })
  }

  useEffect(() => {
    const handlePopState = () => {
      // Show modal if navigating to a path that should show it
      if (modalPaths.includes(location.pathname)) {
        setIsModalVisible(true)
      }
    }

    if (initialLoad) {
      // Initial push state to handle first navigation
      window.history.pushState(null, "", location.pathname)
      setInitialLoad(false)
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [location.pathname, navigate, modalPaths, initialLoad])

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
                    { step: 2, path: "/register/verifikasi-email" },
                    { step: 3, path: "/register/tipe-rekening" },
                    { step: 4, path: "/register/data-diri" },
                    { step: 5, path: "/register/upload-persyaratan" },
                    { step: 6, path: "/register/selesai" },
                  ].map(({ step, path }) => (
                    <Link key={step} to={path} className={`flex items-center justify-center w-8 h-8 text-white rounded-full border ${location.pathname === path ? "bg-blue-500 border-blue-700" : "bg-gray-200 border-[#A09FA4]"}`}>
                      {step}
                    </Link>
                  ))}
                </div>

                {/* Desktop Layout: Full Steps with Labels */}
                <div className="hidden md:flex md:flex-row md:gap-16">
                  {[
                    { step: 1, path: "/register", label: "1. Registrasi Akun" },
                    {
                      step: 2,
                      path: "/register/verifikasi-email",
                      label: "2. Verifikasi Email",
                    },
                    {
                      step: 3,
                      path: "/register/tipe-rekening",
                      label: "3. Pilih Jenis Rekening",
                    },
                    {
                      step: 4,
                      path: "/register/data-diri",
                      label: "4. Masukkan Data Diri",
                    },
                    {
                      step: 5,
                      path: "/register/upload-persyaratan",
                      label: "5. Upload Dokumen Persyaratan",
                    },
                    { step: 6, path: "/register/selesai", label: "6. Selesai" },
                  ].map(({ step, path, label }) => (
                    <div key={step} className="relative flex items-center justify-center flex-1 md:justify-start">
                      <div className={`text-center md:text-left ${getLinkClass(path).text}`}>{label}</div>
                      <div className={`absolute bottom-0 left-0 w-full ${getLinkClass(path).underline}`} style={{ height: "2px" }} aria-hidden />
                    </div>
                  ))}
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

      {/* Modal Component */}
      <Modal
        title="Perhatian"
        description="Apakah Anda yakin ingin meninggalkan halaman ini? Perubahan yang belum disimpan akan hilang."
        visible={isModalVisible}
        buttonLabel="Ya, Tinggalkan"
        onButtonClick={handleModalConfirm}
        onClose={handleModalClose}
      />
    </div>
  )
}

export default RegisterLayout
