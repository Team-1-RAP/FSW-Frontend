import DashboardLayout from "../../../components/layouts/DashboardLayout"
import HouseIcon from "../../../assets/icons/house_dark.png"
import { ChevronRight, Info, RefreshCw } from "react-feather"
import NominalIcon from "../../../assets/icons/nominal.png"
import { Link } from "react-router-dom"

const NominalTransferPage: React.FC = () => {
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
          <h1 className="font-semibold text-[22px] text-[#343C6A]">Masukkan Nominal Transfer</h1>
          <div className="flex flex-col w-[417px]">
            <div className="mb-6">
              <label className="block mb-2 text-base font-medium">Rekening Sumber</label>
              <div className="flex flex-row bg-white border border-[#549EFF] text-[#549EFF] rounded-lg w-[390px] h-full p-2.5 space-x-3">
                <div className="flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#9747FF] mt-2">
                  <p className="text-center text-white font-medium text-base">A</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h1>ADILA WULANDARI</h1>
                  <p>BCA - 12345678</p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-base font-medium">Rekening Tujuan</label>
              <div className="flex flex-row bg-white border border-[#549EFF] text-[#549EFF] rounded-lg w-[390px] h-full p-2.5 space-x-3">
                <div className="flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#FF47ED] mt-2">
                  <p className="text-center text-white font-medium text-base">K</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h1>KENDALL JENNER</h1>
                  <p>BCA - 12345678</p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-base font-medium">Masukkan Nominal</label>
              <div className="relative">
                <img src={NominalIcon} alt="" width={19} height={19} className="text-[#c4c4c4] absolute left-2 top-3" />
                <input
                  type="number"
                  placeholder="Rp1.000.000"
                  className="bg-white border border-[#549EFF] text-[#549EFF] placeholder-[#549EFF] text-sm rounded-lg block w-[390px] p-2.5 focus:ring-[#549EFF] focus:border-[#549EFF] focus:outline-none py-[10px] pl-[40px] pr-[10px]"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-base font-medium">Masukkan Keterangan</label>
              <div className="relative">
                <Info width={19} height={19} className="text-[#549EFF] absolute left-2 top-3" />
                <input
                  type="text"
                  placeholder="Keterangan Transfer"
                  className="bg-white border border-[#549EFF] text-[#549EFF] placeholder-[#549EFF] text-sm rounded-lg block w-[390px] p-2.5 focus:ring-[#549EFF] focus:border-[#549EFF] focus:outline-none py-[10px] pl-[40px] pr-[10px]"
                />
              </div>
            </div>
            <div className="flex justify-end p-[20px] mt-10 gap-5">
              <Link to={"/home/transfer/new"}>
                <button className="bg-white w-[182px] h-[41px] rounded-[10px] border border-[#549EFF] text-[#549EFF]">Kembali</button>
              </Link>
              <Link to={"/home/transfer/new/nominal/confirm"}>
                <button className="bg-[#549EFF] w-[182px] h-[41px] rounded-[10px] border text-white">Selanjutnya</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default NominalTransferPage
