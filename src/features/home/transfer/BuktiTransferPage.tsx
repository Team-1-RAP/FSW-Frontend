import { ChevronRight, RefreshCw } from "react-feather"
import DashboardLayout from "../../../components/layouts/DashboardLayout"
import HouseIcon from "../../../assets/icons/house_dark.png"
import HouseLightIcon from "../../../assets/icons/house_light.png"
import TransaksiSuccessIcon from "../../../assets/icons/transaksi_success.png"
import { Link } from "react-router-dom"

const BuktiTransferPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="w-full lg:w-11/12 h-auto bg-white rounded-[20px] lg:ml-12 mt-10 lg:mt-0 lg:mb-10">
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
          <h1 className="font-semibold text-[22px] text-[#343C6A]">Bukti Transfer</h1>
          <div className="flex flex-col w-[417px]">
            <div className="flex flex-col bg-white border border-[#549EFF] w-[390px]  h-full rounded-lg p-3 items-center gap-5 pt-8">
              <h1 className="font-semibold text-xl text-[#549EFF]">Transaksi Berhasil</h1>
              <img src={TransaksiSuccessIcon} width={65} height={65} alt="" />
              <p className="text-center text-[15px] font-light leading-5">Anda telah mengirimkan</p>
              <p className="text-center text-[15px] font-light leading-5">Rp1.000.000 kepada</p>
              <span className="leading-6 text-[19px] text-center">Kendall Jenner</span>
              <div className="flex justify-end p-[20px] mt-10 gap-5">
                <button className="bg-[#549EFF] w-[169px] h-[39px] rounded-[11px] border border-[#549EFF] text-white font-semibold text-base">Simpan Rekening</button>
                <button className="bg-[#549EFF] w-[94px] h-[39px] rounded-[11px] border border-[#549EFF] text-white font-semibold text-base">Bagikan</button>
              </div>
            </div>
            <div className="flex items-center justify-center pb-[20px] mt-10">
              <Link to={"/home"}>
                <button className="flex items-center justify-center bg-white w-[182px] h-[41px] rounded-[10px] border border-[#549EFF] text-[#549EFF] gap-2">
                  <img src={HouseLightIcon} alt="" width={24} height={24} />
                  <p>Kembali Ke Beranda</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default BuktiTransferPage
