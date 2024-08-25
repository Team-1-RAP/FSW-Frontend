import React from "react"
import { Check } from "react-feather"

const SuccessPage: React.FC = () => {
  return (
    <>
      <div className="text-center w-[340px] flex flex-col items-center gap-4 mt-32">
        <h1 className="font-medium text-2xl">Selamat! Rekening SimpleBank Anda berhasil dibuat</h1>
        <div className="bg-[#055287] p-8 rounded-full">
          <Check className="text-white stroke-[3px]" size={85} />
        </div>
        <p className="font-normal text-base">Anda bisa mengakses layanan SimpleBank melalui aplikasi versi Android dan Website</p>

        <button type="submit" className="bg-[#0066AE] h-12 rounded-xl text-white hover:bg-sky-900 focus:bg-sky-950 px-12 font-bold">
          Login
        </button>
      </div>
    </>
  )
}

export default SuccessPage
