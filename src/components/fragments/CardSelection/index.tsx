import { CardSelectionProps } from "./types";

export const CardSelection = ({
  accountType,
  accountNumber,
  buttonFunction,
  isActive,
}: CardSelectionProps) => {
  return (
    <>
      <button
        className={`text-gray-700 block px-1.5 py-2 text-sm rounded-lg border-2 border-gray-300 ${isActive ? 'bg-gray-200' : 'bg-white'}`}
        onClick={buttonFunction}
      >
        <div className="flex flex-row gap-3">
          <div className="bg-gradient-to-tr from-purple-500 from-35% via-cyan-400 via-90% to-cyan-300 shadow-md text-white w-28 h-16 px-2 pt-1 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h2 className={`font-semibold text-[9px]`}>Simple Bank</h2>
              </div>
              <img
                src="/assets/images/logo-white.png"
                alt="Logo"
                className={"w-5 h-5"}
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-1.5">
            <span className="font-bold">{accountType}</span>
            <span>Rek. {accountNumber}</span>
          </div>
        </div>
      </button>
    </>
  );
};
