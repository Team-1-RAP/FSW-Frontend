import React from "react";
import { Link } from "react-router-dom";
import IncomeImg from "../../../assets/icons/in.png";
import OutcomeImg from "../../../assets/icons/out.png";
import { formatDate } from "../../../utils/MutationUtils";

interface MutationItemsProps {
  id: string;
  date: string;
  amount: number;
  transactionType: string;
  mutationType: string;
}

const MutationItems: React.FC<MutationItemsProps> = ({
  id,
  date,
  amount,
  transactionType,
  mutationType,
}) => {
  const formattedDate = formatDate(date);

  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(Math.abs(amount))
    .replace(/\s/g, "");

  // Menentukan kelas warna berdasarkan jenis mutasi
  const valueClass =
    mutationType === "PENGELUARAN" ? "text-red-500" : "text-green-500";
  const sign = mutationType === "PENGELUARAN" ? "-" : "+";

  return (
    <Link
      to="/mutasi"
      id={`Mutation-${id}`}
      className="flex justify-between items-center"
      role="region"
      aria-labelledby={`${transactionType}-label ${transactionType}-date ${transactionType}-value`}
    >
      <div className="flex items-center">
        <div
          className="bg-[#E7EDFF] rounded-3xl p-3 mr-5"
          role="img"
          aria-hidden="true"
        >
          <img
            src={mutationType === "PEMASUKAN" ? IncomeImg : OutcomeImg}
            alt="tipe pembayaran"
            className="h-[25px] w-[25px]"
          />
        </div>
        <div className="grid justify-items-start">
          <span
            id={`${transactionType}-label`}
            className="text-[16px] font-semibold"
          >
            {transactionType}
          </span>
          <span
            id={`${transactionType}-date`}
            className="text-[15px] text-[#718EBF]"
          >
            {formattedDate}
          </span>
        </div>
      </div>
      <span
        id={`${transactionType}-value`}
        className={`text-[16px] font-semibold ${valueClass}`}
      >
        {sign}
        {formattedValue}
      </span>
    </Link>
  );
};

export default MutationItems;
