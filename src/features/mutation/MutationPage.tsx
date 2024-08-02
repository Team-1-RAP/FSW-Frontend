import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import DropdownItem from "../../components/elements/mutation/DropdownItem";
import {
  months,
  transactionTypes,
  dataOptions,
} from "../../utils/MutationUtils";
import MutationTable from "../../components/elements/mutation/MutationTable";
import Pagination from "../../components/elements/mutation/PaginationItem";
import { Loader } from "react-feather";

import { useMutation } from "../../hooks/useMutation";
import { useAccount } from "../../hooks/useAccount";
import { useMutationToggle } from "../../hooks/useToggle";

const MutasiPage: React.FC = () => {
  const { accounts, activeAccountIndex } = useAccount();
  const { mutations, fetchMutations } = useMutation();
  const [isRefresh, setRefreshTrue, setRefreshFalse] = useMutationToggle(true);

  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedTransactionType, setSelectedTransactionType] = useState<
    string | null
  >(null);
  const [selectedDataOption, setSelectedDataOption] = useState<number | null>(
    null
  );

  const [totalMutations, setTotalMutations] = useState<number>(0);

  const itemsPerPage = selectedDataOption ? selectedDataOption : 10;
  const totalPages = Math.ceil(totalMutations / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setRefreshTrue();
  };

  const handleMonthChange = (month: string | null) => {
    setSelectedMonth(month);
    setCurrentPage(1);
    setRefreshTrue();
  };

  const handleTransactionTypeChange = (type: string | null) => {
    setSelectedTransactionType(type);
    setCurrentPage(1);
    setRefreshTrue();
  };

  const handleDataOptionChange = (option: string | null) => {
    const value =
      option === "Semua" ? totalMutations : option ? parseInt(option, 10) : 10;
    setSelectedDataOption(value);
    setCurrentPage(1);
    setRefreshTrue();
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && isRefresh) {
      setIsLoading(true); // Set loading to true
      if (accounts && accounts.length > 0) {
        const noAccount = accounts[activeAccountIndex].noAccount.toString();
        const month = selectedMonth
          ? months.indexOf(selectedMonth) + 1
          : new Date().getMonth() + 1;
        const type = selectedTransactionType
          ? selectedTransactionType.toUpperCase()
          : "";

        fetchMutations(
          token,
          noAccount,
          month,
          currentPage - 1,
          itemsPerPage,
          type
        )
          .then((response) => {
            setTotalMutations(response.totalItem);
          })
          .finally(() => {
            setRefreshFalse();
            setIsLoading(false);
          });
      }
    }
  }, [
    accounts,
    activeAccountIndex,
    selectedMonth,
    selectedTransactionType,
    selectedDataOption,
    currentPage,
    fetchMutations,
    itemsPerPage,
    isRefresh,
    setRefreshFalse,
  ]);

  return (
    <DashboardLayout>
      <div className="w-full px-4 md:m-6">
        <div className="bg-white md:py-5 rounded-2xl">
          <h1
            className="text-[22px] font-semibold text-[#343C6A] ml-10 mt-10 mb-10"
            aria-label="Mutasi Rekening"
          >
            Mutasi Rekening
          </h1>
          <div className="flex flex-col ml-10 mr-10 space-y-4 md:flex-row md:space-y-0">
            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-2 md:flex-row md:mr-auto">
              <DropdownItem
                id="month-dropdown"
                options={months}
                label="Pilih Bulan"
                onChange={handleMonthChange}
                aria-label="Dropdown pilih bulan"
              />
              <DropdownItem
                id="transaction-type-dropdown"
                options={transactionTypes}
                label="Tipe Transaksi"
                onChange={handleTransactionTypeChange}
                aria-label="Dropdown tipe transaksi"
              />
            </div>
            <div className="md:ml-auto">
              <DropdownItem
                id="show-data-dropdown"
                options={dataOptions}
                label="Tampilkan Data"
                onChange={handleDataOptionChange}
                aria-label="Dropdown tampilkan data"
              />
            </div>
          </div>
          <div className="mt-5">
            {isLoading ? (
              <div
                className="flex justify-center items-center h-32"
                aria-live="polite"
              >
                <Loader
                  className="animate-spin text-[#549EFF]"
                  size={24}
                  aria-label="Memuat data"
                />
              </div>
            ) : (
              <div className="overflow-x-auto md:overflow-x-hidden">
                <MutationTable data={mutations} />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-5 mb-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            aria-label="Navigasi Paginasi"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MutasiPage;
