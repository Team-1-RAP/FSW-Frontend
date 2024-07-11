import { AlignJustify, HelpCircle, Search } from "react-feather"
import logo from "../../../assets/images/logo.png"
import logout from "../../../assets/images/icons/logout-left.png"

interface NavbarProps {
  toggleAside: () => void
}
const Navbar: React.FC<NavbarProps> = ({ toggleAside }) => {
  return (
    <header className="h-25 lg:h-20 bg-[#FFFFFF] top-0 w-full py-5 lg:py-0 fixed shadow">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-y-3 md-gap-y-0 px-4 lg:px-10 h-full mb-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-x-0 lg:gap-x-2">
          <div className="w-24">
            <img src={logo} alt="Logo" className="w-[62px] h-[62px]" />
          </div>
          <p className="font-normal text-sm">Hi, Adilla Wulandari</p>
        </div>
        <div className="flex flex-row space-x-3">
          <button className="lg:hidden flex items-center justify-center bg-[#F1F5F9] w-[36px] h-[36px] rounded-full">
            <AlignJustify className="text-[#235697]" onClick={toggleAside} />
          </button>
          <div className="flex flex-row">
            <div className="relative">
              <input
                className="appearance-none border-2 pl-10 bg-[#F1F5F9] rounded-2xl transition-colors lg:w-[269px] w-[170px] lg:h-[36px] h-[36px] py-2 px-3 text-[#747474] leading-tight focus:outline-none text-base"
                id="username"
                type="text"
                placeholder="Cari layanan..."
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <Search className="ml-3 text-[#235697]" />
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center bg-[#F1F5F9] w-[36px] h-[36px] rounded-full">
            <HelpCircle className="text-[#235697]" />
          </button>
          <button className="flex items-center justify-center bg-[#F1F5F9] w-[36px] h-[36px] rounded-full">
            <img src={logout} alt="" className="w-[20px] h-[20px]" />
            {/* <LogOut className="text-[#235697]" /> */}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
