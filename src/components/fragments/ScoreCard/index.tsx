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
            <div className="text-[#718EBF] text-base">{title}</div>
            <div className="flex">
              <div className="[400px]:text-2xl text-xl font-bold">
                {isVisible || isNumberVisible
                  ? `Rp.${Number(value).toLocaleString("id-ID", {
                      currency: "IDR",
                      minimumFractionDigits: 2,
                    })}-`
                  : `**********`}
              </div>
              {isVisible ? null : (
                <div
                  onClick={toggleNumberVisibility}
                  className={`ms-6 cursor-pointer flex items-center`}
                >
                  {isNumberVisible ? <Eye /> : <EyeOff className="w-7 h-7" />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
