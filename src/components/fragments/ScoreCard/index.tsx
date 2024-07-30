import { useState } from "react";
import { ScoreCardProps } from "./types";
import { Copy, Eye, EyeOff } from "react-feather";
import { useToggle } from "../../../hooks/useToggle";

const ScoreCard = ({
  imgFile,
  title,
  value1,
  value2,
  isVisible = true,
}: ScoreCardProps) => {
  const [isNumberVisible, setIsNumberVisible] = useToggle(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(value2 || "")
      .then(() => {
        console.log("Copied to clipboard");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };
  return (
    <div>
      <div>
        <div className="flex items-center bg-white p-4 rounded-3xl shadow-md">
          <img src={`/assets/images/${imgFile}`} alt="Balance" width="75px" />
          <div className="ms-4">
            <label className="text-[#718EBF] text-base" tabIndex={0}>
              {title}
            </label>
            {isVisible ? null : (
              <div
                className="flex flex-row items-center cursor-pointer"
                onClick={handleCopy}
              >
                <p className="text-[#718EBF]">Rek. {value2}</p>
                <Copy className="w-3 h-3 text-[#718EBF] ms-2" />
              </div>
            )}
            {copied && (
              <span className="fixed bottom-4 bg-blue-500 text-white px-3 py-2 rounded font-semibold">
                Copied!
              </span>
            )}
            <div className="flex">
              <div
                className="[400px]:text-2xl text-xl font-bold"
                tabIndex={0}
                aria-label={
                  isVisible || isNumberVisible ? undefined : "Angka tersembunyi"
                }
              >
                {isVisible || isNumberVisible
                  ? `Rp${Number(value1).toLocaleString("id-ID", {
                      currency: "IDR",
                    })}`
                  : `**********`}
              </div>
              {isVisible ? null : (
                <button
                  onClick={setIsNumberVisible}
                  className={`ms-6 cursor-pointer flex items-center`}
                  aria-pressed={isNumberVisible}
                  aria-label={`Toggle angka ${
                    isNumberVisible ? "tersembunyi" : "tampil"
                  }`}
                >
                  {isNumberVisible ? <Eye /> : <EyeOff className="w-7 h-7" />}
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
