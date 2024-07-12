import { AlignJustify, HelpCircle, LogOut, Search } from "react-feather";
import logo from "../../../assets/images/logo.png";

interface NavbarProps {
  toggleAside: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ toggleAside }) => {
  return (
    <header className="h-25 md:h-20 bg-[#FFFFFF] top-0 w-full py-5 md:py-0 fixed shadow z-10">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-3 md-gap-y-0 px-4 md:px-10 h-full mb-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-x-0 md:gap-x-2">
          <div className="w-24">
            <img src={logo} alt="Logo" className="w-[62px] h-[62px]" />
          </div>
          <p className="font-normal text-sm">Hi, Adilla Wulandari</p>
        </div>
        <div className="flex flex-row space-x-3">
          <button className="md:hidden flex items-center justify-center bg-[#F1F5F9] w-[36px] h-[36px] rounded-full">
            <AlignJustify className="text-[#235697]" onClick={toggleAside} />
          </button>
          <div className="flex flex-row">
            <div className="relative">
              <input
                className="appearance-none border-2 pl-10 bg-[#F1F5F9] rounded-2xl transition-colors md:w-[269px] w-[170px] md:h-[36px] h-[36px] py-2 px-3 text-[#747474] leading-tight focus:outline-none focus:ring text-base"
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
            <LogOut className="text-[#235697]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
