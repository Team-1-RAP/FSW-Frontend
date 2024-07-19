import React from "react";
import { Link } from "react-router-dom";

interface ServiceButtonProps {
  id: string;
  icon: string;
  label: string;
  link: string;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({
  id,
  icon,
  label,
  link,
}) => {
  return (
    <Link
      to={link}
      id={id}
      className="lg:w-[150px] lg:h-[100px] h-[134px]  lg:mt-4 flex flex-col items-center justify-start cursor-pointer no-underline"
      aria-label={label}
    >
      <div
        className="lg:w-[120px] lg:h-[65px] w-[65px] h-[65px] bg-[#DFF0FF] flex items-center justify-center lg:rounded-[18px] rounded-2xl"
        aria-hidden="true"
      >
        <img
          src={icon}
          alt=""
          className="lg:h-[36px] lg:w-[36px] h-[36px] w-[36px]"
        />
      </div>
      <span className="mt-1 lg:mt-2 text-[15px] text-center">{label}</span>
    </Link>
  );
};

export default ServiceButton;
