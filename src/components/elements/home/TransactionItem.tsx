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
  }).format(Math.abs(value));

  return (
    <div
      className="lg:w-[280px] lg:h-[98px] lg:mb-5 bg-white mx-2 flex flex-col items-start justify-center text-center rounded-2xl p-3"
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
            className="lg:text-[14px] text-[#718EBF]"
          >
            {label}
          </span>
          <span className="lg:text-[16px] font-semibold text-[#232323]">
            {formattedValue}-
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
