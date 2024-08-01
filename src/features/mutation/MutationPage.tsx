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

// FETCH API [Aktifkan jika data API sudah tersedia]
// import { useMutation } from "../../hooks/useMutation";
// import { useAccount } from "../../hooks/useAccount";
// import { useMutationToggle } from "../../hooks/useToggle";

import { mutasiData } from "../../utils/MutationDataUtils";

const MutasiPage: React.FC = () => {
    // FETCH API [Aktifkan jika data API sudah tersedia]
    // const { accounts, activeAccountIndex } = useAccount();
    // const { mutations, fetchMutations } = useMutation();
    // const [isRefresh, setRefreshTrue, setRefreshFalse] = useMutationToggle(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedTransactionType, setSelectedTransactionType] = useState<
        string | null
    >(null);
    const [selectedDataOption, setSelectedDataOption] = useState<number | null>(
        null
    );

    const itemsPerPage = selectedDataOption ? selectedDataOption : 10;

    // FETCH API [Aktifkan jika data API sudah tersedia]
    // const totalPages = Math.ceil(mutations.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleMonthChange = (month: string | null) => {
        setSelectedMonth(month);
        setCurrentPage(1);
        // FETCH API [Aktifkan jika data API sudah tersedia]
        // setRefreshTrue();
    };

    const handleTransactionTypeChange = (type: string | null) => {
        setSelectedTransactionType(type);
        setCurrentPage(1);
        // FETCH API [Aktifkan jika data API sudah tersedia]
        // setRefreshTrue();
    };

    const handleDataOptionChange = (option: string | null) => {
        const value =
            option === "Semua"
                ? mutasiData.length
                : option
                ? parseInt(option, 10)
                : 10;
        setSelectedDataOption(value);
        setCurrentPage(1);
        // FETCH API [Aktifkan jika data API sudah tersedia]
        // setRefreshTrue();
    };

    // FETCH API [Aktifkan jika data API sudah tersedia]
    // const paginatedData = mutations.slice(
    //   (currentPage - 1) * itemsPerPage,
    //   currentPage * itemsPerPage
    // );

    // FETCH API [Aktifkan jika data API sudah tersedia]
    // useEffect(() => {
    //   const token = sessionStorage.getItem("token");
    //   if (token && isRefresh) {
    //     if (accounts && accounts.length > 0) {
    //       const noAccount = accounts[activeAccountIndex].noAccount.toString();
    //       const month = selectedMonth
    //         ? months.indexOf(selectedMonth) + 1
    //         : new Date().getMonth() + 1;
    //       const type = selectedTransactionType
    //         ? selectedTransactionType.toUpperCase()
    //         : "";

    //       fetchMutations(
    //         token,
    //         noAccount,
    //         month,
    //         currentPage,
    //         itemsPerPage,
    //         type
    //       ).finally(() => setRefreshFalse());
    //     }
    //   }
    // }, [
    //   accounts,
    //   activeAccountIndex,
    //   selectedMonth,
    //   selectedTransactionType,
    //   selectedDataOption,
    //   currentPage,
    //   fetchMutations,
    //   itemsPerPage,
    //   isRefresh,
    //   setRefreshFalse,
    // ]);

    // // DATA DUMMY [Aktifkan jika data API belum tersedia]
    const filteredData = mutasiData.filter((item) => {
        const monthMatches = selectedMonth
            ? months[new Date(item.date).getMonth()] === selectedMonth
            : true;
        const transactionTypeMatches = selectedTransactionType
            ? item.mutationType.toUpperCase() ===
              selectedTransactionType.toUpperCase()
            : true;
        return monthMatches && transactionTypeMatches;
    });

    // DATA DUMMY [Aktifkan jika data API belum tersedia]
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // DATA DUMMY [Aktifkan jika data API belum tersedia]
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // DATA DUMMY [Aktifkan jika data API belum tersedia]
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedMonth, selectedTransactionType, selectedDataOption]);

    return (
        <DashboardLayout>
            <div className="w-full px-4 md:m-6">
                <div className="bg-white md:py-5 rounded-2xl">
                    <h1 className="text-[22px] font-semibold text-[#343C6A] ml-10 mt-10 mb-10">
                        Mutasi Rekening
                    </h1>
                    <div className="flex flex-col ml-10 mr-10 space-y-4 md:flex-row md:space-y-0">
                        <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-2 md:flex-row md:mr-auto">
                            <DropdownItem
                                id="month-dropdown"
                                options={months}
                                label="Pilih Bulan"
                                onChange={handleMonthChange}
                            />
                            <DropdownItem
                                id="transaction-type-dropdown"
                                options={transactionTypes}
                                label="Tipe Transaksi"
                                onChange={handleTransactionTypeChange}
                            />
                        </div>
                        <div className="md:ml-auto">
                            <DropdownItem
                                id="show-data-dropdown"
                                options={dataOptions}
                                label="Tampilkan Data"
                                onChange={handleDataOptionChange}
                            />
                        </div>
                    </div>
                    <div className="mt-5 overflow-x-auto md:overflow-x-hidden ">
                        {/* FETCH API [Aktifkan jika data API sudah tersedia] */}
                        {/* <MutationTable data={paginatedData} /> */}

                        {/* DATA DUMMY [Aktifkan jika data API belum tersedia] */}
                        <MutationTable data={paginatedData} />
                    </div>
                </div>
                <div className="flex justify-end mt-5 mb-10">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MutasiPage;
