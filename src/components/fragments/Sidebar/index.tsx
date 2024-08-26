import { Home, List, Settings, User, X } from "react-feather"
import { Link, useLocation } from "react-router-dom"

interface SidebarProps {
  isAsideOpen: boolean
  closeAside: () => void
}

const SideBar: React.FC<SidebarProps> = ({ isAsideOpen, closeAside }) => {
  const location = useLocation()

  const getLinkClass = (path: string) => {
    return location.pathname.includes(path) ? "mt-4 flex h-16 space-x-2 flex-row items-center rounded hover:bg-[#CFD4ED] text-[#235697]" : "mt-4 flex h-16 space-x-2 flex-row items-center rounded hover:bg-[#CFD4ED] text-[#838383]"
  }

  return (
    <>
      <aside id="aside" className="hidden lg:flex w-[209px] h-screen lg:flex-col items-center pb-4 shadow fixed z-10">
        <div className="flex flex-col justify-between h-full">
          <ul className="flex flex-col gap-1 mt-2">
            <li className="w-[164px]">
              <Link to="/home" className={getLinkClass("/home")} aria-label="Beranda">
                <Home className="text-inherit" />
                <p className="text-xs font-bold text-inherit">Beranda</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to="/mutasi" className={getLinkClass("/mutasi")} aria-label="Mutasi">
                <List className="text-inherit" />
                <p className="text-xs font-bold text-inherit">Mutasi</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to="/profile" className={getLinkClass("/profile")} aria-label="Profil">
                <User className="text-inherit" />
                <p className="text-xs font-bold text-inherit">Profil</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to="/pengaturan" className={getLinkClass("/pengaturan")} aria-label="Pengaturan">
                <Settings className="text-inherit" />
                <p className="text-xs font-bold text-inherit">Pengaturan</p>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Aside Offcanvas */}
      <aside id="aside" className={`lg:hidden fixed inset-y-0 left-0 z-50 bg-white w-[209px] h-screen flex flex-col items-center pb-4 shadow transition-transform ${isAsideOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-end w-full px-4 mt-5">
          <button className="text-[#235697]" onClick={closeAside}>
            <X />
          </button>
        </div>
        <div className="flex flex-col justify-between h-full">
          <ul className="flex flex-col gap-1 mt-2">
            <li className="w-[164px]">
              <Link to="/home" className={getLinkClass("/home")} aria-label="Beranda">
                <Home className="text-inherit" />
                <p className="text-xs font-bold text-inherit">Beranda</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to="/mutasi" className={getLinkClass("/mutasi")} aria-label="Mutasi">
                <List className="text-inherit" />
                <p className="text-xs font-bold text-inherit">Mutasi</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to="/profile" className={getLinkClass("/profile")} aria-label="Profil">
                <User className="text-inherit" />
                <p className="text-xs font-bold text-inherit">Profil</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to="/pengaturan" className={getLinkClass("/pengaturan")} aria-label="Pengaturan">
                <Settings className="text-inherit" />
                <p className="text-xs font-bold text-inherit">Pengaturan</p>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default SideBar
