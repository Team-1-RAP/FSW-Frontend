import React from "react";
import IncomeImg from "../../../assets/icons/in.png";
import OutcomeImg from "../../../assets/icons/out.png";
import { IMutation } from "../../../services/mutationService";
import { formatDate } from "../../../utils/MutationUtils";

interface MutasiTableProps {
  data: IMutation[];
}

const MutasiTable: React.FC<MutasiTableProps> = ({ data }) => {
  return (
    <table className="w-full mx-8 overflow-x-auto" aria-label="Tabel Mutasi">
      <thead>
        <tr className="text-left">
          <th
            className="text-[16px] text-[#235697] py-2 font-medium"
            aria-label="Icon"
          ></th>
          <th
            className="text-[16px] text-[#235697] py-2 font-medium"
            aria-label="Jenis Transaksi"
          >
            Jenis Transaksi
          </th>
          <th
            className="text-[16px] text-[#235697] py-2 font-medium"
            aria-label="Tanggal"
          >
            Tanggal
          </th>
          <th
            className="text-[16px] text-[#235697] py-2 font-medium"
            aria-label="Deskripsi"
          >
            Deskripsi
          </th>
          <th
            className="text-[16px] text-[#235697] py-2 font-medium"
            aria-label="Nominal"
          >
            Nominal
          </th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={5}
              className="px-2 py-7 text-sm text-[#A09FA4] text-left"
              aria-label="Belum ada transaksi"
            >
              Belum ada transaksi
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr key={index} className="text-[#b7b6b9]">
              <td className="py-4 text-base font-medium">
                <img
                  src={
                    item.mutationType === "PEMASUKAN" ? IncomeImg : OutcomeImg
                  }
                  alt={item.mutationType}
                  className="pr-2 mr-4 md:pr-0 md:mr-0 md:w-6 md:h-6"
                  aria-hidden="true"
                />
              </td>
              <td className="py-4 text-base font-medium">
                {item.transactionType}
              </td>
              <td className="py-4 text-base font-medium">
                {formatDate(item.date)}
              </td>
              <td className="py-4 text-base font-medium">
                {item.type} - {item.recipientName}
              </td>
              <td
                className={`py-4 text-base font-medium ${
                  item.mutationType === "PEMASUKAN"
                    ? "text-[#34C759]"
                    : "text-[#FF3B30]"
                }`}
              >
                {item.amount.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default MutasiTable;
