import React from "react";
import { Link } from "react-router-dom";

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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(Math.abs(numericValue))
    .replace(/\s/g, "");

  // Menentukan warna berdasarkan apakah value positif atau negatif
  const valueClass = numericValue < 0 ? "text-red-500" : "text-green-500";
  const sign = numericValue < 0 ? "-" : "+";

  return (
    <Link
      to="/mutasi"
      id={id}
      className="flex justify-between items-center"
      role="region"
      aria-labelledby={`${id}-label ${id}-date ${id}-value`}
    >
      <div className="flex items-center">
        <div
          className="bg-[#E7EDFF] rounded-3xl p-3 mr-5"
          role="img"
          aria-hidden="true"
        >
          <img src={icon} alt="tipe pembayaran" className="h-[25px] w-[25px]" />
        </div>
        <div className="grid justify-items-start">
          <span id={`${id}-label`} className="text-[16px] font-semibold">
            {label}
          </span>
          <span id={`${id}-date`} className="text-[15px] text-[#718EBF]">
            {formattedDate}
          </span>
        </div>
      </div>
      <span
        id={`${id}-value`}
        className={`text-[16px] font-semibold ${valueClass}`}
      >
        {sign}
        {formattedValue}
      </span>
    </Link>
  );
};

export default MutasiItems;
