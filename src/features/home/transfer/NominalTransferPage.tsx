import React, { useState, useEffect, useContext } from "react";
import HouseIcon from "../../../assets/icons/house_dark.png";
import { ChevronRight, Info, RefreshCw } from "react-feather";
import NominalIcon from "../../../assets/icons/nominal.png";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountContext } from "../../../context/AccountContext";
import Alert from "../../../components/fragments/Alert";

const NominalTransferPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { accounts } = useContext(AccountContext) || {};

    const { accountNumber, accountName, bankName } = location.state || {};
    const [selectedAccount, setSelectedAccount] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!location.state || !accountNumber || !accountName || !bankName) {
            navigate("/transfer");
        }
    }, [location.state, navigate, accountNumber, accountName, bankName]);

    const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAccount(e.target.value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^0-9.]/g, "");
        if (/^\d*\.?\d{0,2}$/.test(sanitizedValue)) {
            setAmount(sanitizedValue);
        }
    };

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
    };

    const validateAccount = (): boolean => {
        if (!selectedAccount) {
            setAlertMessage("Harap pilih rekening sumber.");
            setIsAlertVisible(true);
            setTimeout(() => setIsAlertVisible(false), 3000);
            return false;
        }

        const account = accounts?.find((acc) => acc.noAccount.toString() === selectedAccount);
        if (!account) {
            setAlertMessage("Rekening sumber tidak ditemukan.");
            setIsAlertVisible(true);
            setTimeout(() => setIsAlertVisible(false), 3000);
            return false;
        }

        if (account.balance - parseFloat(amount) < 50000) {
            setAlertMessage("Saldo tidak mencukupi untuk melakukan transfer.");
            setIsAlertVisible(true);
            setTimeout(() => setIsAlertVisible(false), 3000);
            return false;
        }

        return true;
    };

    const validateAmount = (): boolean => {
        const numericAmount = parseFloat(amount);

        if (isNaN(numericAmount) || numericAmount <= 0) {
            setAlertMessage("Harap masukkan jumlah transfer yang valid.");
            setIsAlertVisible(true);
            setTimeout(() => setIsAlertVisible(false), 3000);
            return false;
        }

        if (numericAmount < 10000) {
            setAlertMessage("Nominal transfer minimal 10000.");
            setIsAlertVisible(true);
            setTimeout(() => setIsAlertVisible(false), 3000);
            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        if (!validateAccount() || !validateAmount()) return;

        const account = accounts?.find((acc) => acc.noAccount.toString() === selectedAccount);

        navigate("/transfer/confirm", {
            state: {
                accountNumber,
                accountName,
                bankName,
                selectedAccount: account,
                amount: parseFloat(amount),
                note,
            },
        });
    };

    return (
        <div className="w-full lg:w-11/12 h-auto bg-white rounded-[20px] lg:ml-12 mt-10 lg:mt-0 lg:mb-10">
            <div className="flex flex-col ml-8 gap-5">
                <div className="flex flex-row space-x-2 mt-5">
                    <img src={HouseIcon} alt="House Icon" width={24} height={24} />
                    <p className="font-normal text-[#235697] text-sm mt-1">Beranda</p>
                    <ChevronRight className="text-[#235697]" />
                    <RefreshCw className="text-[#235697]" />
                    <p className="font-normal text-[#235697] text-sm mt-1">Transfer</p>
                </div>
                <hr className="w-[90%] border-t-1 border-[#235697]" />
            </div>

            <div className="flex flex-col ml-8 gap-5 mt-3">
                <h1 className="font-semibold text-[22px] text-[#343C6A]" tabIndex={0}>Masukkan Nominal Transfer</h1>
                <div className="flex flex-col w-[417px]">
                    <div className="mb-6">
                        <label className="block mb-2 text-base font-medium">Rekening Tujuan</label>
                        <div className="flex flex-row bg-white border border-[#549EFF] text-[#549EFF] rounded-lg w-[390px] h-full p-2.5 space-x-3">
                            <div className="flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#FF47ED] mt-2">
                                <p className="text-center text-white font-medium text-base">K</p>
                            </div>
                            <div className="flex flex-col gap-1" aria-label="Rekening Tujuan Detail" tabIndex={0}>
                                <p>{accountName}</p>
                                <p>
                                    {bankName} - {accountNumber}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-base font-medium">Pilih Rekening Sumber</label>
                        <select
                            value={selectedAccount}
                            onChange={handleAccountChange}
                            className="bg-white border border-[#549EFF] text-[#549EFF] text-sm rounded-lg block w-[390px] p-2.5 focus:ring-[#549EFF] focus:border-[#549EFF] focus:outline-none"
                        >
                            <option value="" disabled>
                                Pilih Rekening Sumber
                            </option>
                            {accounts?.map((acc) => (
                                <option key={acc.noAccount} value={acc.noAccount}>
                                    {acc.fullName} - {acc.noAccount}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-base font-medium">Masukkan Nominal</label>
                        <div className="relative">
                            <img src={NominalIcon} alt="Nominal Icon" width={19} height={19} className="text-[#c4c4c4] absolute left-2 top-3" />
                            <label htmlFor="nominal" className="sr-only">Nominal Transfer</label>
                            <input
                                type="text"
                                id="nominal"
                                placeholder="Masukkan Nominal"
                                value={amount}
                                onWheel={(e) => (e.target as HTMLInputElement).blur()} // Prevent scrolling
                                onChange={handleAmountChange}
                                className="bg-white border border-[#549EFF] text-[#549EFF] placeholder-[#549EFF] text-sm rounded-lg block w-[390px] p-2.5 focus:ring-[#549EFF] focus:border-[#549EFF] focus:outline-none py-[10px] pl-[40px] pr-[10px]"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-base font-medium">Masukkan Keterangan</label>
                        <div className="relative">
                            <Info width={19} height={19} className="text-[#549EFF] absolute left-2 top-3" />
                            <label htmlFor="keterangan" className="sr-only">Masukan Keterangan</label>
                            <input
                                id="keterangan"
                                type="text"
                                placeholder="Keterangan Transfer"
                                value={note}
                                onChange={handleNoteChange}
                                className="bg-white border border-[#549EFF] text-[#549EFF] placeholder-[#549EFF] text-sm rounded-lg block w-[390px] p-2.5 focus:ring-[#549EFF] focus:border-[#549EFF] focus:outline-none py-[10px] pl-[40px] pr-[10px]"
                            />
                        </div>
                    </div>
                    <Alert message={alertMessage} isVisible={isAlertVisible} />
                    <div className="flex justify-end p-[20px] mt-10 gap-5">
                        <button onClick={handleBackClick} className="bg-white w-[182px] h-[41px] rounded-[10px] border border-[#549EFF] text-[#549EFF]">
                            Kembali
                        </button>
                        <button onClick={handleSubmit} className="bg-[#549EFF] w-[182px] h-[41px] rounded-[10px] border text-white">
                            Lanjutkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NominalTransferPage;
