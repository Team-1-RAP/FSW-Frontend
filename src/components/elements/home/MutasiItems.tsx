import React from "react";

interface MutasiItemsProps {
  id: string;
  icon: string;
  label: string;
  value: string;
  date: Date;
}

const MutasiItems: React.FC<MutasiItemsProps> = ({
  id,
  icon,
  label,
  value,
  date,
}) => {
  // Format tanggal menjadi string yang lebih mudah dibaca
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Mengubah value menjadi number dan memformat sebagai currency
  const numericValue = parseFloat(value);
  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Math.abs(numericValue));

  // Menentukan warna berdasarkan apakah value positif atau negatif
  const valueClass = numericValue < 0 ? "text-red-500" : "text-green-500";
  const sign = numericValue < 0 ? "-" : "+";

  return (
    <div
      id={id}
      className="flex justify-between items-center"
      role="listitem"
      aria-label={`${label} on ${formattedDate}: ${sign}${formattedValue}`}
    >
      <div className="flex items-center">
        <div className="bg-[#E7EDFF] rounded-3xl p-3 mr-5" aria-hidden="true">
          <img src={icon} alt="" className="h-[25px] w-[25px]" />
        </div>
        <div className="grid justify-items-start">
          <span className="text-[16px] font-semibold">{label}</span>
          <span className="text-[15px] text-[#718EBF]">{formattedDate}</span>
        </div>
      </div>
      <span className={`text-[16px] font-semibold ${valueClass}`}>
        {sign}
        {formattedValue}
      </span>
    </div>
  );
};

export default MutasiItems;
