import { Check } from "react-feather";
import Button from "../../../components/fragments/Authentication/Button";
import { useNavigate } from "react-router-dom";

export const QrisTransactionSuccess = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-11 items-center w-[389px] pb-10 pt-10">
      <div className="font-medium text-3xl text-center">
        <p>Selamat!</p>
        <p>Transaksi anda berhasil!</p>
      </div>
      <div className="bg-[#055287] p-8 rounded-full">
        <Check className="text-white stroke-[3px]" size={85} />
      </div>
      <div className="text-center">
        <p>
          Anda telah membayar sebesar <b>Rp500.000</b>
        </p>
        <p>
          melalui fitur QRIS kepada <b>Toko Madura</b>
        </p>
      </div>
      <Button className="bg-primary" onClick={() => navigate("/home")}>
        Kembali ke home
      </Button>
    </div>
  );
};
