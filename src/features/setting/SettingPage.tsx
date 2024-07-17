import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
const SettingPage: React.FC = () => {
  return (
    <>
      <DashboardLayout>
        <div className="flex flex-col lg:flex-row lg:space-x-6 lg:ml-12">
          <div className="lg:w-1/2">
            <div className="flex justify-between">
              <h1 className="text-[22px] text-[#343C6A] font-semibold">
                Setting{" "}
              </h1>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default SettingPage;
