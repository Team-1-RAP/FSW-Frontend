import { useState } from "react";
import { ScoreCardProps } from "./types";
import { Eye, EyeOff } from "react-feather";

const ScoreCard = ({ imgFile, title, value, isVisible }: ScoreCardProps) => {
  const [isNumberVisible, setIsNumberVisible] = useState(false);

  const toggleNumberVisibility = () => {
    setIsNumberVisible(!isNumberVisible);
  };
  return (
    <div>
      <div>
        <div className="flex items-center bg-white p-4 rounded-3xl shadow-md">
          <img src={`/assets/images/${imgFile}`} alt="Balance" width="75px" />
          <div className="ms-4">
            <div className="text-[#718EBF] text-base" tabIndex={0}>
              {title}
            </div>
            <div className="flex">
              <div
                className="[400px]:text-2xl text-xl font-bold"
                tabIndex={0}
                aria-label={
                  isVisible || isNumberVisible ? undefined : "Angka tersembunyi"
                }
              >
                {isVisible || isNumberVisible
                  ? `Rp.${Number(value).toLocaleString("id-ID", {
                      currency: "IDR",
                      minimumFractionDigits: 2,
                    })}-`
                  : `**********`}
              </div>
              {isVisible ? null : (
                <button
                  onClick={toggleNumberVisibility}
                  className={`ms-6 cursor-pointer flex items-center`}
                  aria-pressed={isNumberVisible}
                  aria-label={`Toggle angka ${isNumberVisible ? "tersembunyi" : "tampil"}`}
                >
                  {isNumberVisible ? <Eye/> : <EyeOff className="w-7 h-7"/>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
