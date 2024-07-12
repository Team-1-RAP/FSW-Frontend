import React, { useState } from "react";
import Card from "../../components/fragments/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { CardProps } from "./../../components/fragments/Card/types";
import ScoreCard from "../../components/fragments/ScoreCard";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-feather";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Profile: React.FC = () => {
  const cards: CardProps[] = [
    {
      variant: "purpleCyan",
      size: "md",
      userFullName: "John Doe",
      userCardExpiration: new Date(),
      userCardNumber: "1234 5678 910",
    },
    {
      variant: "blueCyan",
      size: "md",
      userFullName: "Adilla Wulandari",
      userCardExpiration: new Date(2028, 10),
      userCardNumber: "1234 5678 910",
    },
    {
      variant: "blueCyan",
      size: "md",
      userFullName: "Adilla Wulandari",
      userCardExpiration: new Date(2028, 10),
      userCardNumber: "1234 5678 910",
    },
  ];

  const data = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Pemasukan",
        data: [500, 300, 400, 250, 450, 150, 300],
        backgroundColor: "#396AFF",
        borderRadius: Number.MAX_VALUE,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
        borderSkipped: false,
      },
      {
        label: "Pengeluaran",
        data: [200, 150, 100, 300, 350, 200, 250],
        backgroundColor: "#FF82AC",
        borderRadius: Number.MAX_VALUE,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
        borderSkipped: false,
      },
    ],
  };

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleSlideChange = (swiper: SwiperCore) => {
    console.log(swiper.realIndex);
    setActiveIndex(swiper.realIndex);
  };
  return (
    <DashboardLayout>
      <div className="me-8">
        <div className="flex">
          <div className="w-1/5 font-semibold text-xl text-[#343C6A]">
            Rekeningku
          </div>
          <div className="w-2/6 flex justify-end">
            <Link className="text-[#838383] text-base" to="/add-account">
              Ganti Kartu
              <ChevronRight
                className="inline-block text-black ms-3"
                size={12}
              />
            </Link>
          </div>
        </div>
        <div className="mt-11 flex">
          <div className="">
            <Swiper
              modules={[Navigation]}
              onSlideChange={handleSlideChange}
              loop={true}
              navigation={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                576: {
                  slidesPerView: 2,
                },
              }}
            >
              {cards.map((card, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    transform:
                      index === activeIndex ? "scale(1)" : "scale(0.8)",
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
        <div className="flex gap-5 mt-10">
          <div className="w-1/3">
            <ScoreCard
              imgFile="income-icon.png"
              title="Pengeluaran"
              value={34678990}
              isVisible={true}
            />
          </div>
          <div className="w-1/3">
            <ScoreCard
              imgFile="balance-icon.png"
              title="Saldo Rekening"
              value={1000000}
              isVisible={false}
            />
          </div>
          <div className="w-1/3">
            <ScoreCard
              imgFile="expense-icon.png"
              title="Pemasukan"
              value={14678990}
              isVisible={true}
            />
          </div>
        </div>
        <div className="flex mt-20">
          <div className="w-1/2">
            <span className="font-semibold text-2xl text-[#343C6A]">
              Aktivitas keuangan anda
            </span>
            <div className="flex items-center mb-4">
              <div className="w-1/2">
                <select
                  id="time"
                  name="Waktu Sewa"
                  className="border-2 border-[#1454FB] rounded-lg w-32 h-8 flex items-center"
                >
                  <option value="" hidden>
                    Pilih Bulan
                  </option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                </select>
              </div>
              <div className="w-1/2 flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-tr to-[#2AF0FA] from-[#0C32FB] rounded-xl text-white text-xs font-medium w-36 h-9"
                >
                  Unduh xls
                </button>
              </div>
            </div>
            <BarChart data={data} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
