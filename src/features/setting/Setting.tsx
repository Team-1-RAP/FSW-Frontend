import { useNavigate } from "react-router-dom";

export const Setting = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center w-[531px] flex flex-col items-center gap-7">
      <p className="font-medium text-2xl">Password dan PIN Transaksi</p>
      <img src="/assets/images/shield.png" alt="shield" sizes={"194px"} />
      <div className="flex flex-col w-full items-start">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <div className="flex flex-row w-full gap-5">
          <input
            id="password"
            type="password"
            className="h-9 border-[1px] rounded-[10px] px-3 w-8/12"
            placeholder="**************"
            disabled
          />
          <button
            type="button"
            className="bg-[#0066AE] h-9 rounded-[10px] w-4/12 text-white hover:bg-sky-900 focus:bg-sky-950"
            onClick={(e) => {
              e.currentTarget.blur();
              navigate("change-password");
            }}
          >
            Ubah Password
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full items-start">
        <label htmlFor="pin" className="font-medium">
          PIN
        </label>
        <div className="flex flex-row w-full gap-5">
          <input
            id="pin"
            type="pin"
            className="h-9 border-[1px] rounded-[10px] px-3 w-8/12"
            placeholder="**************"
            disabled
          />
          <button
            type="button"
            className="bg-[#0066AE] h-9 rounded-[10px] w-4/12 text-white hover:bg-sky-900 focus:bg-sky-950"
            onClick={(e) => {
              e.currentTarget.blur();
              navigate("change-pin");
            }}
          >
            Ubah PIN
          </button>
        </div>
      </div>
    </div>
  );
};
