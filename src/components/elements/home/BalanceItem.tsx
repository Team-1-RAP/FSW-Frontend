import { useState } from "react";

export interface BalanceItemProps {
  imgFile: string;
  title: string;
  value1: number;
  value2: number;
  isVisible?: boolean;
}
import { Eye, EyeOff, Copy } from "react-feather";

const BalanceItem = ({
  imgFile,
  title,
  value1,
  value2,
  isVisible,
}: BalanceItemProps) => {
  const [isNumberVisible, setIsNumberVisible] = useState(false);

  const toggleNumberVisibility = () => {
    setIsNumberVisible(!isNumberVisible);
  };

  const [copied, setCopied] = useState(false);

  const valueAcc = value1.toString();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(valueAcc).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div>
      <div>
        <div
          id="Balance-Item"
          className="flex items-center bg-white p-4 rounded-3xl shadow-md"
          aria-label="Saldo Rekening"
        >
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
              {copied && (
                <span
                  className="bg-[#FFBB38] text-white px-2 py-1 rounded text-base"
                  aria-label="Nomor Rekening Tersalin"
                >
                  Copied!
                </span>
              )}
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

export default BalanceItem;
