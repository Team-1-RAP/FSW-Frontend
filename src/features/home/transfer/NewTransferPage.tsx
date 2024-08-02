import React, { useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import HouseIcon from "../../../assets/icons/house_dark.png";
import { ChevronRight, RefreshCw } from "react-feather";
import BankIcon from "../../../assets/icons/bank.png";
import RekeningIcon from "../../../assets/icons/rekening.png";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/fragments/Alert";
import { validateAndFetchAccountData } from "../../../services/accountValidationService";

const NewTransferPage: React.FC = () => {
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const handleValidate = async () => {
        if (token) {
            await validateAndFetchAccountData(accountNumber, token, navigate, setLoading, setError);
        } else {
            setError("Token tidak tersedia.");
        }
    };

    const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setAccountNumber(inputValue);
        }
    };

    return (
        <DashboardLayout>
            <div className="w-full lg:w-11/12 h-auto bg-white rounded-[20px] lg:ml-12 mt-10 lg:mt-0 lg:mb-10">
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

                <div className="flex flex-col ml-8 gap-5 mt-3">
                    <h1 className="font-semibold text-[22px] text-[#343C6A]">Masukkan Tujuan Transfer</h1>
                    <div className="flex flex-col w-[417px]">
                        <div className="mb-6">
                            <label className="block mb-2 text-base font-medium">Pilih Bank Tujuan</label>
                            <div className="relative">
                                <img src={BankIcon} alt="" width={19} height={19} className="text-[#c4c4c4] absolute left-2 top-3" />
                                <input
                                    type="text"
                                    placeholder="BCA"
                                    className="bg-white border border-[#549EFF] text-[#549EFF] placeholder-[#549EFF] text-sm rounded-lg block w-[390px] p-2.5 focus:ring-[#549EFF] focus:border-[#549EFF] focus:outline-none py-[10px] pl-[40px] pr-[10px]"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-base font-medium">Masukkan Rekening Tujuan</label>
                            <div className="relative">
                                <img src={RekeningIcon} alt="" width={19} height={19} className="text-[#c4c4c4] absolute left-2 top-3" />
                                <input
                                    type="text"
                                    placeholder="12345678"
                                    value={accountNumber}
                                    onChange={handleAccountNumberChange}
                                    onWheel={(e) => (e.target as HTMLInputElement).blur()} // Prevent scroll on input
                                    className="bg-white border border-[#549EFF] text-[#549EFF] placeholder-[#549EFF] text-sm rounded-lg block w-[390px] p-2.5 focus:ring-[#549EFF] focus:border-[#549EFF] focus:outline-none py-[10px] pl-[40px] pr-[10px]"
                                />
                            </div>
                            <Alert message={error ?? ""} isVisible={!!error} />
                        </div>
                        <div className="flex justify-end p-[20px] mt-10">
                            <button className="bg-[#549EFF] w-[182px] h-[41px] rounded-[10px] border text-white" onClick={handleValidate} disabled={loading}>
                                {loading ? "Memvalidasi..." : "Selanjutnya"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default NewTransferPage;
