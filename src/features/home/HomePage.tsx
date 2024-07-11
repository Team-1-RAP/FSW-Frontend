import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ServiceButton from "../../components/elements/home/ServiceButton";
import { services } from "../../utils/ServiceButtonUtils";
import TransactionItem from "../../components/elements/home/TransactionItem";
import { transactions } from "../../utils/TransactionItemUtils";

const HomePage: React.FC = () => {
  return (
    <>
      <DashboardLayout>
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-1">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} {...transaction} />
            ))}
          </div>
          <h1 className="text-[15px] font-semibold ml-2 mb-4 text-[#121F59]">
            Layanan Digital
          </h1>
          <div className="grid grid-cols-4 lg:gap-4 gap-1">
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
      </DashboardLayout>
    </>
  );
};

export default HomePage;
