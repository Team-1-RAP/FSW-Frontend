import React from "react";

interface TransactionItemProps {
  icon: string;
  label: string;
  value: number;
  color: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  icon,
  label,
  value,
  color,
}) => {
  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(Math.abs(value))
    .replace(/\s/g, "");

  return (
    <div
      className="shadow-md w-[100%] lg:w-[48%] xl:w-[330px] xl:h-[98px] xl:mb-5 xl:mr-2 bg-white flex flex-col items-start justify-center text-center rounded-2xl p-3"
      role="region"
      aria-labelledby={`transaction-${label}`}
    >
      <div className="flex items-center justify-center">
        <div
          className="rounded-full w-14 h-14 flex items-center justify-center mr-2"
          style={{ backgroundColor: `#${color}` }}
          aria-hidden="true"
        >
          <img src={icon} alt="" className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-start justify-start">
          <span
            id={`transaction-${label}`}
            className="xl:text-[14px] text-[#718EBF]"
          >
            {label}
          </span>
          <span
            className="xl:text-[16px] font-semibold text-[#232323]"
            aria-label={`${formattedValue}`}
          >
            {formattedValue}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
