import React, { useEffect, useState } from "react";
import Card from "../../components/fragments/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Keyboard } from "swiper/modules";
import { CardProps } from "./../../components/fragments/Card/types";
import ScoreCard from "../../components/fragments/ScoreCard";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-feather";
import * as XLSX from "xlsx";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BarChart } from "../../components/fragments/Chart";
import { useAccount } from "../../hooks/useAccount";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Profile: React.FC = () => {
  const { accounts, fetchAccounts } = useAccount();
  const [activeAccount, setActiveAccount] = useState<number>(0);
  const [isRefresh, setRefresh] = useState(true);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && isRefresh) {
      fetchAccounts(token);
      setRefresh(false);
    }
  }, [fetchAccounts, isRefresh]);
  const cards: CardProps[] =
    accounts?.map((account) => {
      return {
        variant: "purpleCyan",
        size: "md",
        userFullName: account.fullName,
        userCardExpiration: new Date(account.expDate),
        userCardNumber: account.cardNumber,
      };
    }) ?? [];

  // const cards: CardProps[] = [
  //   {
  //     variant: "purpleCyan",
  //     size: "md",
  //     userFullName: "John Doe",
  //     userCardExpiration: new Date(),
  //     userCardNumber: "1234 5678 910",
  //   },
  //   {
  //     variant: "blueCyan",
  //     size: "md",
  //     userFullName: "Adilla Wulandari",
  //     userCardExpiration: new Date(2028, 10),
  //     userCardNumber: "1234 5678 910",
  //   },
  //   {
  //     variant: "blueCyan",
  //     size: "md",
  //     userFullName: "Adilla Wulandari",
  //     userCardExpiration: new Date(2028, 10),
  //     userCardNumber: "1234 5678 910",
  //   },
  // ];

  const data = {
    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
    datasets: [
      {
        label: "Pemasukan",
        data: [500, 300, 400, 250],
        backgroundColor: "#396AFF",
        borderRadius: Number.MAX_VALUE,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
        borderSkipped: false,
      },
      {
        label: "Pengeluaran",
        data: [200, 150, 100, 300],
        backgroundColor: "#FF82AC",
        borderRadius: Number.MAX_VALUE,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
        borderSkipped: false,
      },
    ],
  };

  const downloadXLS = () => {
    const wb = XLSX.utils.book_new();
    const wsName = "Laporan Keuangan";

    const wsData = [
      ["Hari", "Pemasukan", "Pengeluaran"],
      ...data.labels.map((label, index) => [
        label,
        data.datasets[0].data[index],
        data.datasets[1].data[index],
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, wsName);
    XLSX.writeFile(wb, "laporan-keuangan.xlsx");
  };

  const handleSlideChange = (swiper: SwiperCore) => {
    console.log(swiper.realIndex);
    setActiveAccount(swiper.realIndex);
  };

  const [selectedMonth, setSelectedMonth] = useState("");

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col">
        <div className="flex mx-8">
          <div
            className="lg:w-4/12 w-1/2 font-semibold text-xl text-[#343C6A]"
            tabIndex={0}
          >
            Rekeningku
          </div>
          <div className="lg:w-5/12 w-1/2 flex justify-end">
            <Link className="text-[#838383] text-base" to="/add-account">
              Ganti Kartu
              <ChevronRight
                className="inline-block text-black ms-3"
                size={12}
              />
            </Link>
          </div>
        </div>
        <div className="mt-11 flex lg:w-100 sm:mx-8">
          <div className="lg:w-3/4 w-full flex">
            <Swiper
              modules={[Navigation, Keyboard]}
              onSlideChange={handleSlideChange}
              slideToClickedSlide={true}
              navigation={true}
              keyboard={{
                enabled: true,
              }}
              loop={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: cards.length > 1 ? 2 : 1,
                },
              }}
            >
              {cards.map((card, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    transform:
                      index === activeAccount ? "scale(1)" : "scale(0.8)",                    
                  }}
                >
                  <Card
                    variant={card.variant}
                    size={card.size}
                    userFullName={card.userFullName}
                    userCardNumber={card.userCardNumber}
                    userCardExpiration={card.userCardExpiration}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="flex xl:flex-row flex-col gap-3 mt-10 mx-8">
          <div className="xl:w-1/3 w-full">
            <ScoreCard
              imgFile="income-icon.png"
              title="Pengeluaran"
              value={34678990}
              isVisible={true}
            />
          </div>
          <div className="xl:w-1/3 w-full">
            <ScoreCard
              imgFile="balance-icon.png"
              title="Saldo Rekening"
              value={accounts ? accounts[activeAccount].balance : 0}
              isVisible={false}
            />
          </div>
          <div className="xl:w-1/3 w-full">
            <ScoreCard
              imgFile="expense-icon.png"
              title="Pemasukan"
              value={14678990}
              isVisible={true}
            />
          </div>
        </div>
        <div className="flex mt-20 sm:mx-8 mx-4">
          <div className="xl:w-1/2 w-full">
            <span
              className="font-semibold text-2xl text-[#343C6A]"
              tabIndex={0}
            >
              Aktivitas keuangan anda
            </span>
            <div className="flex items-center mb-4">
              <div className="w-1/2">
                <select
                  id="time"
                  name="Waktu Sewa"
                  className="border-2 border-[#1454FB] rounded-lg w-32 h-8 flex items-center focus:border-black"
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="" hidden>
                    Pilih Bulan
                  </option>
                  <option value="january">Januari</option>
                  <option value="february">Februari</option>
                  <option value="march">Maret</option>
                  <option value="april">April</option>
                  <option value="may">Mei</option>
                  <option value="june">Juni</option>
                  <option value="july">Juli</option>
                  <option value="august">Agustus</option>
                  <option value="september">September</option>
                  <option value="october">Oktober</option>
                  <option value="november">November</option>
                  <option value="december">Desember</option>
                </select>
              </div>
              <div className="w-1/2 flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-tr to-[#2AF0FA] from-[#0C32FB] rounded-xl text-white text-xs font-medium w-36 h-9"
                  onClick={downloadXLS}
                  aria-label="Unduh chart data ke dalam file excel"
                >
                  Unduh .xls
                </button>
              </div>
            </div>
            <BarChart
              data={data}
              ariaLabel={`Bar Chart Aktivitas keuangan ${
                selectedMonth ? "bulan " + selectedMonth : ""
              }`}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
