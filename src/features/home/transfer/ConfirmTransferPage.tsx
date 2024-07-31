import DashboardLayout from "../../../components/layouts/DashboardLayout"
import HouseIcon from "../../../assets/icons/house_dark.png"
import { ChevronRight, RefreshCw } from "react-feather"
import { Link } from "react-router-dom"

const ConfirmTransferPage: React.FC = () => {
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
          <h1 className="font-semibold text-[22px] text-[#343C6A]">Konfirmasi Transfer</h1>
          <div className="flex flex-col w-[417px]">
            <div className="flex flex-col bg-white border border-[#549EFF] w-[390px]  h-full rounded-lg p-3">
              <div className="mb-6">
                <label className="block mb-2 text-base font-medium text-[#549EFF]">Rekening Sumber</label>
                <div className="flex flex-row text-[#549EFF] space-x-3">
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
                <label className="block mb-2 text-base font-medium text-[#549EFF]">Rekening Tujuan</label>
                <div className="flex flex-row text-[#549EFF] space-x-3">
                  <div className="flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#FF47ED]  mt-2">
                    <p className="text-center text-white font-medium text-base">A</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1>KENDALL JENNER</h1>
                    <p>BCA - 12345678</p>
                  </div>
                </div>
              </div>
              <div className="mb-6 flex justify-between">
                <label className="block mb-2 text-base font-medium text-[#549EFF]">Nominal</label>
                <p className="text-[#549EFF]">Rp1.000.000</p>
              </div>
              <div className="mb-6 flex justify-between">
                <label className="block mb-2 text-base font-medium text-[#549EFF]">Biaya Admin</label>
                <p className="text-[#549EFF]">0</p>
              </div>
              <div className="mb-6 flex justify-between">
                <label className="block mb-2 text-base font-medium text-[#549EFF]">Total</label>
                <p className="text-[#549EFF]">Rp1.000.000</p>
              </div>
              <div className="mb-6 flex justify-between">
                <label className="block mb-2 text-base font-medium text-[#549EFF]">Keterangan</label>
                <p className="text-[#549EFF]"></p>
              </div>
            </div>
            <div className="mt-2">
              <label className="block mb-2 text-base font-medium">Pin Transaksi</label>
              <input
                type="number"
                placeholder="Masukkan Pin"
                className="bg-white border border-[#549EFF] text-[#549EFF] placeholder-[#549EFF] text-sm rounded-lg block w-[390px] p-2.5 focus:ring-[#549EFF] focus:border-[#549EFF] focus:outline-none"
              />
            </div>
            <div className="flex justify-end p-[20px] mt-10 gap-5">
              <Link to={"/home/transfer/nominal"}>
                <button className="bg-white w-[182px] h-[41px] rounded-[10px] border border-[#549EFF] text-[#549EFF]">Kembali</button>
              </Link>
              <Link to={"/home/transfer/success"}>
                <button className="bg-[#549EFF] w-[182px] h-[41px] rounded-[10px] border text-white">Transfer</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ConfirmTransferPage
