import { useState } from "react";
import { ScoreCardProps } from "./types";
import { Eye, EyeOff, Copy } from "react-feather";

const ScoreCard = ({
  imgFile,
  title,
  value1,
  value2,
  isVisible,
}: ScoreCardProps) => {
  const [isNumberVisible, setIsNumberVisible] = useState(false);

  const toggleNumberVisibility = () => {
    setIsNumberVisible(!isNumberVisible);
  };

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value1).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div>
      <div>
        <div className="flex items-center bg-white p-4 rounded-3xl shadow-md">
          <img src={`/assets/images/${imgFile}`} alt="Balance" width="75px" />
          <div className="ms-4 flex-1">
            <p className="text-[#718EBF] text-base" tabIndex={0}>
              {title}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-[#718EBF] text-base" tabIndex={0}>
                No Rek. <span className="font-medium">{value1}</span>
              </p>
              <button
                onClick={copyToClipboard}
                aria-label="Salin nomor rekening"
              >
                <Copy
                  className={`h-5 w-5 ${
                    copied ? "text-[#FFBB38]" : "text-[#718EBF]"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div
                className="[400px]:text-2xl text-xl font-bold"
                tabIndex={0}
                aria-label={
                  isVisible || isNumberVisible ? undefined : "Angka tersembunyi"
                }
              >
                {isVisible || isNumberVisible
                  ? `Rp${Number(value2).toLocaleString("id-ID", {
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}`
                  : `**********`}
              </div>
              {isVisible ? null : (
                <button
                  onClick={toggleNumberVisibility}
                  className="mr-3 flex items-center"
                  aria-pressed={isNumberVisible}
                  aria-label={`Toggle angka ${
                    isNumberVisible ? "tersembunyi" : "tampil"
                  }`}
                >
                  {isNumberVisible ? (
                    <Eye className="w-6 h-6" />
                  ) : (
                    <EyeOff className="w-6 h-6" />
                  )}
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
