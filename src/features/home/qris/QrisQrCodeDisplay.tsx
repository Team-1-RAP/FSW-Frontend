import { useEffect, useState } from "react";
import { QrisContentTemplate } from "./Template/QrisContentTemplate";
import QRCode from "react-qr-code";
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const QrisQrCodeDisplay = () => {
  const navigate = useNavigate()
  const { token } = useAuth();
  const location = useLocation();
  const [seconds, setSeconds] = useState(300);
  console.log (location.state.dataResponse.data.qrCode)
  const status = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/v1/qris/validate-qr-code/${location.state.dataResponse.data.qrCode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json(); 
        console.log("QR Code valid", data.data);
        navigate("/QRIS/success",{state: {data}})
      } else {
        console.log("QR Code invalid");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    status(); 
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
        value={location.state.dataResponse.data.qrCode}
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
