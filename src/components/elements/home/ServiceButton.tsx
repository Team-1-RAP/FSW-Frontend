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
      className="lg:w-[165px] lg:h-[134px] h-[134px] flex flex-col items-center justify-start  cursor-pointer no-underline"
    >
      <div className="lg:w-[145px] lg:h-[65px] w-[65px] h-[65px] bg-[#DFF0FF] flex items-center justify-center lg:rounded-[18px] rounded-2xl">
        <img
          src={icon}
          alt={label}
          className="lg:h-[36px] lg:w-[36px] h-[36px] w-[36px] "
        />
      </div>
      <span className="mt-1 lg:mt-2 text-[15px]  text-center">{label}</span>
    </Link>
  );
};

export default ServiceButton;
