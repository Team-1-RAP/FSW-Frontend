import React from "react";
import { ChevronRight, RefreshCw } from "react-feather";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import HouseIcon from "../../../assets/icons/house_dark.png";
import TransaksiSuccessIcon from "../../../assets/icons/transaksi_success.png";
import { useLocation, useNavigate } from "react-router-dom";
import { downloadPDF } from "../../../utils/pdfUtils";
import { formatDate } from "../../../utils/dateUtils";
import "jspdf-autotable";
import { saveAccountToLocalStorage } from "../../../utils/strgUser";

const BuktiTransferPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { state } = location;
    const { noRef, date, recipientFullName, recipientBankName, recipientBankAccountNo, amount, senderAccountNo, senderFullName } = state || {};

    const { formattedDate, formattedTime } = formatDate(date);

    const handleDownloadPDF = () => {
        const lastDigitSender = senderAccountNo.slice(-4);
        const lastDigitRecipient = recipientBankAccountNo.slice(-4);
        downloadPDF({
            formattedTime: formattedTime,
            formattedDate: formattedDate,
            recipientFullName: recipientFullName,
            recipientBankName: recipientBankName,
            recAccountNo: lastDigitRecipient,
            amount: amount,
            senderFullName: senderFullName,
            docAccountNo: lastDigitSender,
            noRef: noRef,
        });
    };

    const authToken = sessionStorage.getItem("token");

    const handleSaveAccount = () => {
        // Check if authToken is not null
        if (authToken) {
            const newAccount = {
                bankName: recipientBankName,
                accountNumber: recipientBankAccountNo,
                ownerName: recipientFullName,
            };

            // Call the function to save the account
            const success = saveAccountToLocalStorage(authToken, newAccount);

            // Handle success and navigate
            if (success) {
                navigate("/home");
            } else {
                console.error("Failed to save account.");
            }
        } else {
            // Handle the case where authToken is null
            console.error("Auth token is not available.");
        }
    };

    return (
        <DashboardLayout>
            <div className="w-full lg:w-11/12 h-auto bg-white rounded-[20px] lg:ml-12 mt-10 lg:mt-0 lg:mb-10">
                {/* Navigation */}
                <div className="flex flex-col ml-8 gap-5">
                    <div className="flex flex-row space-x-2 mt-5">
                        <img src={HouseIcon} alt="" width={24} height={24} />
                        <p className="font-normal text-[#235697] text-sm mt-1">Beranda</p>
                        <ChevronRight className="text-[#235697]" />
                        <RefreshCw className="text-[#235697]" />
                        <p className="font-normal text-[#235697] text-sm mt-1">Transfer</p>
                    </div>
                    <hr className="w-[90%] border-t-1 border-[#235697]" />
                </div>

                {/* Content */}
                <div className="flex flex-col ml-8 gap-5 mt-3">
                    <h1 className="font-semibold text-[22px] text-[#343C6A]">Bukti Transfer</h1>
                    <div className="flex flex-col w-[417px]">
                        <div className="flex flex-col bg-white border border-[#549EFF] w-[390px] h-full rounded-lg pb-5">
                            <div className="flex flex-col p-3 items-center gap-5 pt-8">
                                <h1 className="font-semibold text-xl text-[#549EFF]">Transaksi Berhasil</h1>
                                <img src={TransaksiSuccessIcon} width={65} height={65} alt="" />
                                <span className="leading-6 text-[19px] text-center font-bold">Rp{amount?.toLocaleString()}</span>
                                <span className="text-center text-sm font-normal leading-5">
                                    Berhasil mengirim dana ke {recipientFullName}
                                    <p>
                                        {recipientBankName} - {recipientBankAccountNo}
                                    </p>
                                </span>
                            </div>
                            <div className="flex flex-col pt-3 pl-5 gap-1 text-sm font-normal leading-5">
                                <p>Detail Transaksi</p>
                                <div className="flex flex-row justify-between w-full">
                                    <span className="flex-1">ID Transaksi</span>
                                    <p className="flex-1">{noRef}</p>
                                </div>
                                <div className="flex flex-row justify-between w-full">
                                    <span className="flex-1">Waktu</span>
                                    <p className="flex-1">{formattedTime}</p>
                                </div>
                                <div className="flex flex-row justify-between w-full">
                                    <span className="flex-1">Tanggal</span>
                                    <p className="flex-1">{formattedDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-10 gap-5">
                            <button onClick={handleSaveAccount} className="bg-white w-[169px] h-[39px] rounded-[11px] border border-[#549EFF] text-[#549EFF] font-semibold text-base">
                                Simpan Rekening
                            </button>
                            <button onClick={handleDownloadPDF} className="bg-[#549EFF] w-[184px] h-[39px] rounded-[11px] border border-[#549EFF] text-white font-semibold text-base">
                                Unduh Bukti Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BuktiTransferPage;
