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
      className="w-[130px] xl:w-[150px] xl:h-[100px] h-[134px]  xl:mt-4 flex flex-col items-center justify-start cursor-pointer no-underline"
      aria-label={label}
    >
      <div
        className="lg:w-[120px] lg:h-[65px] w-[65px] h-[65px] bg-[#DFF0FF] flex items-center justify-center xl:rounded-[18px] rounded-2xl"
        aria-hidden="true"
      >
        <img
          src={icon}
          alt=""
          className="h-[36px] w-[36px]"
        />
      </div>
      <span className="mt-2 text-[15px] text-center">{label}</span>
    </Link>
  );
};

export default ServiceButton;
