import { Eye, EyeOff } from "react-feather";
import { CardProps } from "./types.ts";
import { cva } from "class-variance-authority";
import classNameMerger from "../../../utils/classNameMerger.ts";
import { useState } from "react";

const cardVariants = cva("rounded-lg", {
  variants: {
    variant: {
      purpleCyan:
        "bg-gradient-to-tr from-purple-500 from-35% via-cyan-400 via-90% to-cyan-300 p-7 shadow-md text-white",
      blueCyan:
        "bg-gradient-to-tr from-blue-700 from-20% via-cyan-400 via-70% to-cyan-300 p-7 shadow-md text-white",
    },
    size: {
      sm: "w-60 h-40",
      md: "w-[350px] h-56",
      lg: "w-[415px] h-64",
    },
  },
  defaultVariants: {
    variant: "purpleCyan",
    size: "md",
  },
});

const Card = ({
  variant,
  size,
  userFullName,
  userCardExpiration,
  userCardNumber,
}: CardProps) => {
  const getSizeClasses = (size?: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm":
        return {
          sizeLogo: "w-3.5 h-4",
          sizeMasterCardLogo: "w-[18px] h-2.5",
          sizeBrandText: "text-sm",
          sizeAttributeText: "text-[6px]",
          sizeAttributeValueText: "text-[8px]",
          marginText: "mt-3",
        };
      case "lg":
        return {
          sizeLogo: "w-7 h-8",
          sizeMasterCardLogo: "w-12 h-7",
          sizeBrandText: "text-base",
          sizeAttributeText: "text-xs",
          sizeAttributeValueText: "text-sm",
          marginText: "mt-14",
        };
      case "md":
      default:
        return {
          sizeLogo: "w-7 h-8",
          sizeMasterCardLogo: "w-12 h-7",
          sizeBrandText: "text-base",
          sizeAttributeText: "text-xs",
          sizeAttributeValueText: "text-sm",
          marginText: "mt-8",
        };
    }
  };

  const {
    sizeLogo,
    sizeMasterCardLogo,
    sizeBrandText,
    sizeAttributeText,
    sizeAttributeValueText,
    marginText,
  } = getSizeClasses(size);

  const [isNumberVisible, setIsNumberVisible] = useState(false);

  const toggleNumberVisibility = () => {
    setIsNumberVisible(!isNumberVisible);
  };

  return (
    <div>
      <div className={classNameMerger(cardVariants({ variant, size }))}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className={`font-semibold ${sizeBrandText}`}>Simple Bank</h2>
          </div>
          <img
            src="/assets/images/logo-white.png"
            alt="Logo"
            className={sizeLogo}
          />
        </div>
        <div className={marginText}>
          <div className="flex items-center">
            {isNumberVisible ? (
              <span className="text-xl">{userCardNumber}</span>
            ) : (
              <span className="text-2xl" aria-label="Angka Tersembunyi">**********</span>
            )}
            <button
              onClick={toggleNumberVisibility}
              className={`ms-4 cursor-pointer ${sizeLogo}`}
              
            >
              {isNumberVisible ? (
                <Eye className={sizeLogo} />
              ) : (
                <EyeOff className={sizeLogo} />
              )}
            </button>
          </div>
          <div className={`flex flex-wrap ${marginText}`}>
            <div className="w-2/4">
              <span className={`block ${sizeAttributeText}`}>
                Pemegang kartu
              </span>
              <span className={`block font-semibold ${sizeAttributeValueText}`}>
                {userFullName}
              </span>
            </div>
            <div className="w-1/4 -ms-2">
              <span className={`block ${sizeAttributeText}`}>Kadaluwarsa</span>
              <span className={`block font-semibold ${sizeAttributeValueText}`}>
                {userCardExpiration?.toLocaleDateString("en-US", {
                  year: "2-digit",
                  month: "2-digit",
                })}
              </span>
            </div>
            <div className="w-1/4 flex justify-end items-center">
              <img
                src="/assets/images/mastercard-logo.png"
                alt="Mastercard Logo"
                className={`${sizeMasterCardLogo}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
