import { Check } from "react-feather";

export const PinChangeSuccess = () => {
  return (
    <div className="text-center w-[340px] flex flex-col items-center gap-4 mb-24">
      <div className="bg-[#055287] p-8 rounded-full">
        <Check className="text-white stroke-[3px]" size={85} />
      </div>
      <p className="font-bold text-2xl">Pin Berhasil Diubah</p>
      <p className="font-medium text-xs mx-10">
        Silakan gunakan pin yang baru Anda buat untuk melakukan transaksi
        berikutnya
      </p>
    </div>
  );
};
