import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ServiceButton from "../../components/elements/home/ServiceButton";
import { services } from "../../utils/ServiceButtonUtils";

const HomePage: React.FC = () => {
  return (
    <>
      <DashboardLayout>
        <div>
          <div className="">
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
        </div>
      </DashboardLayout>
    </>
  );
};

export default HomePage;
