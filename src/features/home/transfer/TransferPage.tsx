import DashboardLayout from "../../../components/layouts/DashboardLayout"
import HouseIcon from "../../../assets/icons/house_dark.png"
import { ChevronRight, RefreshCw, Search } from "react-feather"
import { Link } from "react-router-dom"

const TransferPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className=" w-full lg:w-11/12 h-screen bg-white rounded-[20px] lg:ml-12 mt-10 lg:mt-0 lg:mb-10">
        {/* Navigation */}
        <div className="flex flex-col ml-8 gap-5">
          <div className=" flex flex-row space-x-2  mt-5">
            <img src={HouseIcon} alt="" width={24} height={24} />
            <p className="font-normal text-[#235697] text-sm mt-1">Beranda</p>
            <ChevronRight className="text-[#235697]" />
            <RefreshCw className="text-[#235697]" />
            <p className="font-normal text-[#235697] text-sm mt-1">Transfer</p>
          </div>
          <hr className="w-[90%] border-t-1 border-[#235697]" />
        </div>

        {/* Content */}
        <div className="flex flex-col ml-8 gap-5 mt-3 pr-2 lg:pr-0">
          <h1 className="font-semibold text-[22px] text-[#343C6A]">Transfer</h1>
          <Link to={"/home/transfer/new"}>
            <button className="bg-[#549EFF] w-[209px] h-[39px] rounded-[10px] border border-[#549EFF] text-white font-normal text-base">Transfer Baru</button>
          </Link>
          <div className="flex flex-col border border-[#DDDDDD] w-[390px] h-auto rounded-[10px] gap-3 p-5">
            <h1 className="font-medium text-lg text-[#343C6A]">Daftar Transfer</h1>
            <div className="flex flex-row">
              <div className="relative">
                <input
                  className="appearance-none border border-[#235697] rounded-2xl transition-colors w-[360px] h-[48px] py-2 px-3 text-[#235697] placeholder:text-[#235697] leading-tight focus:outline-none text-base"
                  id="username"
                  type="text"
                  placeholder="Cari daftar transfer..."
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <Search className="ml-3 text-[#235697]" />
                </div>
              </div>
            </div>
            <div className="flex flex-row rounded-lg w-[390px] h-full space-x-3">
              <div className="flex items-center justify-center rounded-full w-[30px] h-[30px] bg-[#FF47ED]">
                <p className="text-center font-medium text-base">A</p>
              </div>
              <h1 className="font-normal text-base">Anto Pamungkas</h1>
            </div>
            <div className="flex flex-row rounded-lg w-[390px] h-full space-x-3">
              <div className="flex items-center justify-center rounded-full w-[30px] h-[30px] bg-[#9747FF]">
                <p className="text-center font-medium text-base">A</p>
              </div>
              <h1 className="font-normal text-base">Anto Pamungkas</h1>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TransferPage
