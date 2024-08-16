import { useEffect, useState } from "react";
import { QrisContentTemplate } from "./Template/QrisContentTemplate";
import QRCode from "react-qr-code";

export const QrisQrCodeDisplay = () => {
  const [seconds, setSeconds] = useState(300);

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  return (
    <QrisContentTemplate>
      <p className="text-sm text-center w-[290px]">
        Tunjukan kode kepada penjual untuk melakukan pembayaran
      </p>
      <QRCode
        value="https://www.google.com"
        fgColor="white"
        bgColor="#549EFF"
        className="p-14 bg-[#549EFF] border rounded-xl"
      />
      <div className="text-center">
        <p>kode akan berakhir pada</p>
        <p className="text-primary text-xl font-bold">{formatTime(seconds)}</p>
      </div>
    </QrisContentTemplate>
  );
};
