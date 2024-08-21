import { useEffect, useState } from "react";
import { QrisContentTemplate } from "./Template/QrisContentTemplate";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../../components/fragments/Authentication/Button";
import { Link } from "react-router-dom";

export const QrisQrCodeDisplay = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const location = useLocation();
  const [seconds, setSeconds] = useState(0);
  const [expired, setExpired] = useState(false);
  const dueDate = new Date(location.state.dataResponse.data.dueDate);

  const calculateRemainingSeconds = () => {
    const now = new Date();
    const difference = dueDate.getTime() - now.getTime();

    if (difference <= 0) {
      setExpired(true);
      return 0;
    } else {
      setExpired(false);
      return Math.floor(difference / 1000);
    }
  };

  useEffect(() => {
    setSeconds(calculateRemainingSeconds());
    const intervalId = setInterval(() => {
      const remainingSeconds = calculateRemainingSeconds();
      setSeconds(remainingSeconds);
      status();
      if (remainingSeconds <= 0) {
        clearInterval(intervalId);
        
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dueDate]);

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
        navigate("/QRIS/success", { state: { data } });
      } else {
        console.log("QR Code invalid");
      }
    } catch (error) {
      console.log("error");
    }
  };


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
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
        <p>{expired ? "kode kadaluarsa" : "kode akan berakhir pada"}</p>
        <p className="text-primary text-xl font-bold">
        {expired ? (
          <Link to={"/qris"}><Button className="w-[305px] bg-primary mt-5">
            Kembali
          </Button></Link>
        ) : (
          formatTime(seconds)
        )}
        </p>
      </div>
    </QrisContentTemplate>
  );
};
