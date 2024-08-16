import { NavLink, Outlet } from "react-router-dom";
import { BreadCrumbsHeaderProps } from "./types";
import HouseIcon from "../../../assets/icons/house_dark.png";

export const BreadCrumbsHeader = ({ children }: BreadCrumbsHeaderProps) => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg mx-7 lg:h-[calc(100vh-110px)]">
        <div className="px-6 pt-6 h-scr">
          <header className="border-b border-[#235697] h-9">
            <div className="flex flex-row gap-2 px-2 items-center">
              <NavLink to={"/home"} className={`flex flex-row gap-1`}>
                <img src={HouseIcon} alt="" width={24} height={24} />
                <p className="font-normal text-[#235697] text-sm mt-1">
                  Beranda
                </p>
              </NavLink>
              {children}
            </div>
          </header>
          <main className="flex mt-10 justify-center">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
