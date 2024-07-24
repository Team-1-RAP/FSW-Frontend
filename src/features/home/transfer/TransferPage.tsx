import DashboardLayout from "../../../components/layouts/DashboardLayout"
import HouseIcon from "../../../assets/icons/house_dark.png"
import { ChevronRight, RefreshCw } from "react-feather"

const TransferPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className=" w-full lg:w-11/12 h-auto bg-white rounded-[20px] lg:ml-12 mt-10 lg:mt-0 lg:mb-10">
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
        <div className="flex flex-col ml-8 gap-5 mt-3">
          <h1 className="font-semibold text-[22px] text-[#343C6A]">Transfer</h1>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TransferPage
