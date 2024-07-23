import { AlignJustify, HelpCircle, Search } from "react-feather";
import logo from "../../../assets/images/logo.png";
import logoutIcon from "../../../assets/icons/logout-left.png";

import { useAuth } from "../../../hooks/useAuth";

interface NavbarProps {
  toggleAside: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ toggleAside }) => {
  const { fullname, logout } = useAuth();

  console.log(fullname);
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="h-25 lg:h-20 bg-[#FFFFFF] top-0 w-full py-5 lg:py-0 fixed shadow z-10">
      <div className="flex flex-col justify-between h-full px-4 mb-auto lg:flex-row lg:items-center gap-y-3 md-gap-y-0 lg:px-10">
        <div className="flex flex-col justify-between lg:flex-row lg:items-center gap-x-0 lg:gap-x-2">
          <div className="w-24">
            <img src={logo} alt="Logo" className="w-[62px] h-[62px]" />
          </div>
          <p className="text-sm font-normal">Hi,{fullname}</p>
        </div>
        <div className="flex flex-row">
          <button className="lg:hidden flex items-center justify-center bg-[#F1F5F9] w-[36px] h-[36px] rounded-full">
            <AlignJustify className="text-[#235697]" onClick={toggleAside} />
          </button>
          <div className="flex flex-row ml-[auto]">
            <div className="relative">
              <input
                className="appearance-none border-2 pl-10 bg-[#F1F5F9] rounded-2xl transition-colors lg:w-[269px] w-[170px] lg:h-[36px] h-[36px] py-2 px-3 text-[#747474] leading-tight focus:outline-none text-base w-[auto]"
                id="username"
                type="text"
                placeholder="Cari layanan..."
              />
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Search className="ml-3 text-[#235697]" />
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center bg-[#F1F5F9] w-[36px] h-[36px] rounded-full">
            <HelpCircle className="text-[#235697]" />
          </button>
          <button className="flex items-center justify-center bg-[#F1F5F9] w-[36px] h-[36px] rounded-full">
            <img
              src={logoutIcon}
              className="w-[20px] h-[20px]"
              onClick={handleLogout}
            />
            {/* <LogOut className="text-[#235697]" /> */}
            {/* <LogOut className="text-[#235697]" onClick={handleLogout} /> */}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
