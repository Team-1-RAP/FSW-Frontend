import React from "react";

interface TransactionItemProps {
  icon: string;
  label: string;
  value: number | string;
  color: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  icon,
  label,
  value,
  color,
}) => {
  return (
    <div className="lg:w-[331px] lg:h-[98px] bg-white mx-2 flex flex-col items-start justify-center text-center rounded-2xl p-3">
      <div className="flex items-center justify-center">
        <div
          className={`bg-[#${color}]  rounded-full w-14 h-14 flex items-center justify-center mr-2`}
        >
          <img src={icon} alt={label} className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-start justify-start">
          <span className="text-[16px] text-[#718EBF]">{label}</span>
          <span className="text-[22px] font-semibold text-[#232323]">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
