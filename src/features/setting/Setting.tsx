import { useNavigate } from "react-router-dom"
import { ChevronRight } from "react-feather"

export const Setting = () => {
  const navigate = useNavigate();


  return (
    <div className="text-center w-[531px] flex flex-col items-center gap-7 pb-10">
      <p className="font-medium text-2xl">Password dan PIN Transaksi</p>
      <img src="/assets/images/shield.png" alt="Shield Icon" className="w-48" />
      <button
        className="flex flex-row justify-between w-[201px] h-[34px] border border-[#0066AE] pl-2 pt-1 rounded-[5px]
    hover:bg-[#0066AE] text-[#0066AE] hover:text-white focus:bg-[#0066AE] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
        onClick={() => navigate("change-password")}
      >
        <p className="font-medium">Ubah Password</p>
        <ChevronRight />
      </button>
      <button
        className="flex flex-row justify-between w-[201px] h-[34px] border border-[#0066AE] pl-2 pt-1 rounded-[5px]
    hover:bg-[#0066AE] text-[#0066AE]  hover:text-white focus:bg-[#0066AE] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#0066AE]"
        onClick={() => navigate("change-pin")}
      >
        <p className="font-medium">Ubah Pin</p>
        <ChevronRight />
      </button>

      <h1 className="text-center text-[#838383] mt-10 ">Untuk menjaga keamanan akun Anda Ubah password akun dan PIN transaksi secara berkala</h1>
    </div>
  )
}
