import { Controller, useForm } from "react-hook-form";
import { IQrisTransferForm, QrisTransferSchema } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../components/fragments/Authentication/Button";
import { QrisContentTemplate } from "./Template/QrisContentTemplate";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../../hooks/useAccount";
import { useAuth } from "../../../hooks/useAuth";
import {useState} from "react"

export const QrisTransfer = () => {
  const [messageFailed, SetMessageFailed] = useState(false)
  const { token } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IQrisTransferForm>({
    resolver: yupResolver(QrisTransferSchema),
    defaultValues: {
      sourceAccountNumber: "",
      nominal: "",
      pin: "",
    },
  });
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const onSubmit = async (data: IQrisTransferForm) => {
    try {
      const body = JSON.stringify({
        amount: data.nominal,
        pin: data.pin,
        accountNo: data.sourceAccountNumber,
      });
  
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "api/v1/qris/generate-qr-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }
      );
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Something went wrong');
      }
      SetMessageFailed(false)
      const dataResponse = await response.json();
      navigate("display", {state: {dataResponse}});
    } catch (error) {
      SetMessageFailed(true)
    }
  };  
  return (
    <QrisContentTemplate>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 w-full">
          <Controller
            control={control}
            name="sourceAccountNumber"
            render={({ field }) => (
              <>
                <label htmlFor="sourceAccountNumber" className="font-medium ">
                  Pilih Rekening Sumber
                </label>
                <select
                  id="sourceAccountNumber"
                  {...field}
                  className={`border rounded-[10px] h-10 px-3 text-[#549EFF] ${
                    errors.sourceAccountNumber
                      ? "input-error"
                      : "border-[#549EFF] placeholder-blue"
                  }`}
                >
                  <option value="" disabled selected>
                    Pilih Rekening Sumber
                  </option>
                  {accounts?.map((account) => (
                    <option
                      className="text-black"
                      key={account.noAccount}
                      value={account.noAccount}
                    >
                      {account.noAccount} - {account.accountType}
                    </option>
                  ))}
                </select>
                {errors.sourceAccountNumber && (
                  <span className="text-red-500">
                    {errors.sourceAccountNumber.message}
                  </span>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="nominal"
            render={({ field }) => (
              <>
                <label htmlFor="nominal" className="font-medium">
                  Nominal
                </label>
                <input
                  id="nominal"
                  type="text"
                  {...field}
                  placeholder="Masukkan Nominal"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    if (/^[0-9]*$/.test(value)) {
                      field.onChange(value);
                    }
                  }}
                  className={`border rounded-[10px] h-10 px-3 text-[#549EFF] ${
                    errors.nominal
                      ? "input-error"
                      : "border-[#549EFF] placeholder-blue"
                  }`}
                />
                {errors.nominal && (
                  <span className="text-red-500">{errors.nominal.message}</span>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="pin"
            render={({ field }) => (
              <>
                <label htmlFor="pin" className="font-medium">
                  PIN Transaksi
                </label>
                <input
                  id="pin"
                  type="password"
                  {...field}
                  placeholder="Masukkan PIN"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    if (/^[0-9]*$/.test(value) && value.length <= 6) {
                      field.onChange(value);
                    }
                  }}
                  className={`border rounded-[10px] h-10 px-3 text-[#549EFF] ${
                    errors.pin
                      ? "input-error"
                      : "border-[#549EFF] placeholder-blue"
                  }`}
                />
                {errors.pin && (
                  <span className="text-red-500">{errors.pin.message}</span>
                )}
              </>
            )}
          />
        </div>
        <Button type={"submit"} className="w-[305px] bg-primary mt-11">
          Selanjutnya
        </Button>
        {messageFailed && (
            <span className="text-red-500">Pastikan pin benar</span>
          )}
      </form>
      <div className="w-full flex flex-col gap-3 bg-[#EFEFEF] border rounded-xl p-3">
        <p className="font-bold text-primary">keterangan</p>
        <div className="text-sm">
          <p>1. Pilih Rekening Sumber</p>
          <p>2. Masukan PIN Simple Bank</p>
          <p>3. Masukan Nominal yang akan Anda bayar</p>
          <p>4. Tunjukan QR CarDeleteModalode kepada penjual</p>
        </div>
      </div>
    </QrisContentTemplate>
  );
};
