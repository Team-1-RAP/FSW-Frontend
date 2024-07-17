import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ServiceButton from "../../components/elements/home/ServiceButton";
import { services } from "../../utils/ServiceButtonUtils";
import TransactionItem from "../../components/elements/home/TransactionItem";
import { transactions } from "../../utils/TransactionItemUtils";
import { CardProps } from "./../../components/fragments/Card/types";
import Card from "../../components/fragments/Card";
import ScoreCard from "../../components/fragments/ScoreCard";
import MutasiItems from "../../components/elements/home/MutasiItems";
import { mutasiItems } from "../../utils/MutasiItemsUtils";

const HomePage: React.FC = () => {
  const cards: CardProps[] = [
    {
      variant: "purpleCyan",
      size: "md",
      userFullName: "John Doe",
      userCardExpiration: new Date(),
      userCardNumber: "1234 5678 910",
    },
  ];
  return (
    <>
      <DashboardLayout>
        <div className="flex flex-col lg:flex-row lg:space-x-6 lg:ml-12">
          <div className="lg:w-1/2">
            <div className="flex justify-between">
              <h1 className="text-[22px] text-[#343C6A] font-semibold">
                Rekeningku{" "}
              </h1>
              <button className="flex items-center">
                <p className="text-[#838383] text-[15px] font-semibold">
                  Ganti kartu
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#235697"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ms-3 icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 6l6 6l-6 6" />
                </svg>
              </button>
            </div>
            <div className="mt-3">
              {cards.map((card) => (
                <Card
                  variant={card.variant}
                  size={card.size}
                  userFullName={card.userFullName}
                  userCardNumber={card.userCardNumber}
                  userCardExpiration={card.userCardExpiration}
                />
              ))}
            </div>
            <div className="mt-4">
              <ScoreCard
                imgFile="balance-icon.png"
                title="Saldo Rekening"
                value={1000000}
                isVisible={false}
              />
            </div>
            <div className=" mt-4 grid gap-3 shadow-md p-7 rounded-3xl bg-white">
              {mutasiItems.map((mutasi) => (
                <MutasiItems
                  key={mutasi.id}
                  id={mutasi.id}
                  icon={mutasi.icon}
                  label={mutasi.label}
                  value={mutasi.value}
                  date={mutasi.date}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6 mt-2 lg:space-y-0 lg:mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 gap-4">
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  icon={transaction.icon}
                  label={transaction.label}
                  value={transaction.value}
                  color={transaction.color}
                />
              ))}
            </div>
            <h1 className="text-[15px] font-semibold ml-2 mt-4 md:mb-10 text-[#121F59]">
              Layanan Digital
            </h1>
            <div className="grid grid-cols-4 lg:gap-4 gap-4">
              {services.map((services, index) => (
                <ServiceButton
                  key={index}
                  id={services.id}
                  icon={services.icon}
                  label={services.label}
                  link={services.link}
                />
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default HomePage;
