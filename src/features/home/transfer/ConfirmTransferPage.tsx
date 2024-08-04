import React, { useCallback, useState } from "react";
import HouseIcon from "../../../assets/icons/house_dark.png";
import { ChevronRight, RefreshCw } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { submitTransfer } from "../../../services/confirmTransferService";
import { validatePin } from "../../../utils/validation";
import Alert from "../../../components/fragments/Alert";
import Modal from "../../../components/fragments/Modal";

const ConfirmTransferPage: React.FC = () => {
    const token = sessionStorage.getItem("token");
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { accountNumber, accountName, bankName, selectedAccount, amount, note } = state || {};

    const [pin, setPin] = useState<string>("");
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // tambahkan state untuk modal

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPin(value);
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCloseModal = useCallback(() => setIsModalVisible(false), []);
    const handleButtonClick = useCallback(() => {
        navigate("/pengaturan/change-pin");
        handleCloseModal();
    }, [navigate, handleCloseModal]);

    const handleSubmit = async () => {
        const pinError = validatePin(pin);
        if (pinError) {
            setAlertMessage(pinError);
            setIsAlertVisible(true);
            setTimeout(() => setIsAlertVisible(false), 3000);
            return;
        }

        const transferData = {
            accountNo: selectedAccount?.noAccount ?? "",
            recipientAccountNo: accountNumber ?? "",
            recipientBankName: bankName ?? "",
            amount,
            pin,
            description: note ?? "",
            senderFullName: selectedAccount?.fullName ?? "",
        };

        if (token) {
            await submitTransfer(transferData, token, navigate, setAlertMessage, setIsAlertVisible, setIsModalVisible);
        }
    };

    return (
        <div className="w-full lg:w-11/12 h-auto bg-white rounded-[20px] lg:ml-12 mt-10 lg:mt-0 lg:mb-10">
            <div className="flex flex-col ml-8 gap-5">
                <div className="flex flex-row space-x-2 mt-5">
                    <img src={HouseIcon} alt="Home" width={24} height={24} />
                    <p className="font-normal text-[#235697] text-sm mt-1">Beranda</p>
                    <ChevronRight className="text-[#235697]" />
                    <RefreshCw className="text-[#235697]" />
                    <p className="font-normal text-[#235697] text-sm mt-1">Transfer</p>
                </div>
                <hr className="w-[90%] border-t-1 border-[#235697]" />
            </div>

            <div className="flex flex-col ml-8 gap-5 mt-3">
                <h1 className="font-semibold text-[22px] text-[#343C6A]">Konfirmasi Transfer</h1>
                <div className="flex flex-col w-[417px]">
                    <div className="flex flex-col bg-white border border-[#549EFF] w-[390px] h-full rounded-lg p-3">
                        <div className="mb-6">
                            <label className="block mb-2 text-base font-medium text-[#549EFF]">Rekening Sumber</label>
                            <div className="flex flex-row text-[#549EFF] space-x-3">
                                <div className="flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#9747FF] mt-2">
                                    <p className="text-center text-white font-medium text-base">A</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1>{selectedAccount?.fullName}</h1>
                                    <p>
                                        {bankName} - {selectedAccount?.noAccount}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-base font-medium text-[#549EFF]">Rekening Tujuan</label>
                            <div className="flex flex-row text-[#549EFF] space-x-3">
                                <div className="flex items-center justify-center rounded-full w-[40px] h-[40px] bg-[#FF47ED] mt-2">
                                    <p className="text-center text-white font-medium text-base">A</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1>{accountName}</h1>
                                    <p>
                                        {bankName} - {accountNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6 flex justify-between">
                            <label className="block mb-2 text-base font-medium text-[#549EFF]">Nominal</label>
                            <p className="text-[#549EFF]">Rp{amount.toLocaleString()}</p>
                        </div>
                        <div className="mb-6 flex justify-between">
                            <label className="block mb-2 text-base font-medium text-[#549EFF]">Biaya Admin</label>
                            <p className="text-[#549EFF]">0</p>
                        </div>
                        <div className="mb-6 flex justify-between">
                            <label className="block mb-2 text-base font-medium text-[#549EFF]">Total</label>
                            <p className="text-[#549EFF]">Rp{amount.toLocaleString()}</p>
                        </div>
                        <div className="mb-6 flex justify-between">
                            <label className="block mb-2 text-base font-medium text-[#549EFF]">Keterangan</label>
                            <p className="text-[#549EFF]">{note}</p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <label className="block mb-2 text-base font-medium">Pin Transaksi</label>
                        <input
                            type="password"
                            inputMode="numeric"
                            pattern="\d*"
                            placeholder="Masukkan PIN"
                            value={pin}
                            onChange={handlePinChange}
                            maxLength={6}
                            className="bg-white border border-[#549EFF] text-[#549EFF] placeholder-[#549EFF] text-sm rounded-lg block w-[390px] p-2.5 focus:ring-[#549EFF] focus:border-[#549EFF] focus:outline-none"
                        />
                    </div>
                    <Alert message={alertMessage} isVisible={isAlertVisible} />
                    <div className="flex justify-end p-[20px] mt-10 gap-5">
                        <button onClick={handleBackClick} className="bg-white w-[182px] h-[41px] rounded-[10px] border border-[#549EFF] text-[#549EFF]">
                            Kembali
                        </button>
                        <button onClick={handleSubmit} className="bg-[#549EFF] w-[182px] h-[41px] rounded-[10px] border text-white">
                            Transfer
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                visible={isModalVisible}
                title="PIN sedang terblokir"
                description="Yuk, ubah PIN transaksi Anda terlebih dahulu untuk dapat kembali melakakukan transaksi "
                buttonLabel="Ubah PIN"
                onButtonClick={handleButtonClick}
                onClose={handleCloseModal}
                ariaDescribedBy="password-blocked-error"
            />
        </div>
    );
};

export default ConfirmTransferPage;
