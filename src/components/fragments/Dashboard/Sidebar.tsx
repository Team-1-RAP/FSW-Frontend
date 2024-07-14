import { Home, List, Settings, User, X } from "react-feather"
import { Link } from "react-router-dom"

interface SidebarProps {
  isAsideOpen: boolean
  closeAside: () => void
}
const SideBar: React.FC<SidebarProps> = ({ isAsideOpen, closeAside }) => {
  return (
    <>
      <aside id="aside" className="hidden lg:flex w-[209px] h-screen lg:flex-col items-center pb-4 shadow fixed">
        <div className="flex flex-col justify-between h-full">
          <ul className="flex flex-col gap-1 mt-2">
            <li className="w-[164px]">
              <Link to={""} className="mt-4 flex h-16 space-x-2 flex-row items-center rounded hover:bg-[#CFD4ED]">
                <Home className=" text-[#235697]" />
                <p className="text-[#235697] text-xs font-bold">Beranda</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to={""} className="mt-4 flex h-16 space-x-2 flex-row items-center rounded hover:bg-[#CFD4ED]">
                <List className=" text-[#235697]" />
                <p className="text-[#235697] text-xs font-bold">Mutasi</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to={""} className="mt-4 flex h-16 space-x-2 flex-row items-center rounded hover:bg-[#CFD4ED]">
                <User className=" text-[#235697]" />
                <p className="text-[#235697] text-xs font-bold">Profil</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to={""} className="mt-4 flex h-16 space-x-2 flex-row items-center rounded hover:bg-[#CFD4ED]">
                <Settings className=" text-[#235697]" />
                <p className="text-[#235697] text-xs font-bold">Pengaturan</p>
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
              <Link to={""} className="mt-4 flex h-16 space-x-2 flex-row items-center rounded hover:bg-[#CFD4ED]">
                <Home className=" text-[#235697]" />
                <p className="text-[#235697] text-xs font-bold">Beranda</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to={""} className="mt-4 flex h-16 space-x-2 flex-row items-center rounded hover:bg-[#CFD4ED]">
                <List className=" text-[#235697]" />
                <p className="text-[#235697] text-xs font-bold">Mutasi</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to={""} className="mt-4 flex h-16 space-x-2 flex-row items-center rounded hover:bg-[#CFD4ED]">
                <User className=" text-[#235697]" />
                <p className="text-[#235697] text-xs font-bold">Profil</p>
              </Link>
            </li>
            <li className="w-[164px]">
              <Link to={""} className="mt-4 flex h-16 space-x-2 flex-row items-center rounded hover:bg-[#CFD4ED]">
                <Settings className=" text-[#235697]" />
                <p className="text-[#235697] text-xs font-bold">Pengaturan</p>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default SideBar
