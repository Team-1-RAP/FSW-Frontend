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
      sm: "w-[340px] h-52",
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
  previewHidden,
}: CardProps) => {
  const getSizeClasses = (size?: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm":
        return {
          sizeLogo: "w-7 h-8",
          sizeMasterCardLogo: "w-12 h-7",
          sizeBrandText: "text-base",
          sizeAttributeText: "text-[10px]",
          sizeAttributeValueText: "text-base",
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
    <div className="text-start" aria-label="Kartu Bank Aktif" tabIndex={0}>
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
          {previewHidden ? (
            <div className="mt-[88px]"></div>
          ) : (
            <div
              className={`flex items-center`}
              aria-label={isNumberVisible ? undefined : "Angka tersembunyi"}
            >
              <p
                className={isNumberVisible ? "text-xl" : "text-2xl"}
                aria-label="Angka Tersembunyi"
                tabIndex={0}
              >
                {isNumberVisible
                  ? (userCardNumber ?? "0000000000000000")
                      .replace(/(.{4})/g, "$1 ")
                      .slice(0, -1)
                  : `**********`}
              </p>
              <button
                onClick={toggleNumberVisibility}
                className={`ms-4 cursor-pointer ${sizeLogo}`}
                aria-label={`Toggle angka ${
                  isNumberVisible ? "tersembunyi" : "tampil"
                }`}
              >
                {isNumberVisible ? (
                  <Eye className={sizeLogo} />
                ) : (
                  <EyeOff className={sizeLogo} />
                )}
              </button>
            </div>
          )}
          <div className={`flex flex-wrap ${marginText}`}>
            <div className="w-2/4">
              <span className={`block ${sizeAttributeText}`}>
                Pemegang kartu
              </span>
              <span className={`block font-semibold ${sizeAttributeValueText}`}>
                {previewHidden ? "********" : userFullName}
              </span>
            </div>
            <div className="w-1/4 -ms-2">
              <span className={`block ${sizeAttributeText}`}>Kadaluwarsa</span>
              <span className={`block font-semibold ${sizeAttributeValueText}`}>
                {previewHidden
                  ? "**/**"
                  : userCardExpiration?.toLocaleDateString("en-US", {
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
