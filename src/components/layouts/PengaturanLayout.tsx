import { Link, Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

export const PengaturanLayout = () => {
  const getLinkClass = (path: string) => {
    return location.pathname.includes(path)
      ? {
          text: "h-full text-blue-400",
          underline: "border-[1.5px] rounded-t border-blue-700",
        }
      : { text: "h-full text-[#838383]", underline: "" };
  };
  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="bg-white rounded-lg mx-7 lg:h-[calc(100vh-110px)]">
          <div className="px-6 pt-6 h-scr">
            <header className="border-b border-[#A09FA4] h-[34px]">
              <div className="flex flex-row gap-16 px-2 h-[32px]">
                <Link to={"/pengaturan"}>
                  <div className={getLinkClass("/pengaturan").text}>
                    Keamanan
                  </div>
                  <div
                    className={getLinkClass("/pengaturan").underline}
                    aria-hidden
                  />
                </Link>
                <Link to={"/pusat-bantuan"}>
                  <div className={getLinkClass("/pusat-bantuan").text}>
                    Pusat Bantuan
                  </div>
                  <div
                    className={getLinkClass("/pusat-bantuan").underline}
                    aria-hidden
                  />
                </Link>
              </div>
            </header>
            <main className="flex mt-10 justify-center">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
