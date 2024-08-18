import { Controller, useForm } from "react-hook-form";
import { IQrisTransferForm, QrisTransferSchema } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../components/fragments/Authentication/Button";
import { QrisContentTemplate } from "./Template/QrisContentTemplate";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../../hooks/useAccount";
import { generateCode } from "../../../services/qrcodeService";
import { useCallback, useState } from "react";
import Alert from "../../../components/fragments/Alert";
import Modal from "../../../components/fragments/Modal";

export const QrisTransfer = () => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IQrisTransferForm>({
        resolver: yupResolver(QrisTransferSchema),
        defaultValues: {
            sourceAccountNumber: "",
            nominal: "",
            pin: "",
        },
    });

    const { accounts } = useAccount();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const onSubmit = async (data: IQrisTransferForm) => {
        const transformedData = {
            accountNo: data.sourceAccountNumber,
            amount: parseInt(data.nominal),
            pin: data.pin,
        };

        if (token) {
            await generateCode(transformedData, token, navigate, setAlertMessage, setIsAlertVisible, setIsModalVisible);
            console.log(transformedData);
        }
    };

    const handleCloseModal = useCallback(() => setIsModalVisible(false), []);
    const handleButtonClick = useCallback(() => {
        navigate("/pengaturan/change-pin");
        handleCloseModal();
    }, [navigate, handleCloseModal]);

    return (
        <QrisContentTemplate>
            <form className="w-full flex flex-col gap-11 items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1 w-full">
                    <Controller
                        control={control}
                        name="sourceAccountNumber"
                        render={({ field }) => (
                            <>
                                <label htmlFor="sourceAccountNumber" className="font-medium">
                                    Pilih Rekening Sumber
                                </label>
                                <select id="sourceAccountNumber" {...field} className={`border rounded-[10px] h-10 px-3 text-[#549EFF] ${errors.sourceAccountNumber ? "input-error" : "border-[#549EFF] placeholder-blue"}`}>
                                    <option value="" disabled>
                                        Pilih Rekening Sumber
                                    </option>
                                    {accounts?.map((account) => (
                                        <option key={account.noAccount} value={account.noAccount}>
                                            {account.noAccount} - {account.accountType}
                                        </option>
                                    ))}
                                </select>
                                {errors.sourceAccountNumber && <span className="text-red-500">{errors.sourceAccountNumber.message}</span>}
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name="nominal"
                        render={({ field }) => (
                            <>
                                <label htmlFor="nominal" className="font-medium">
                                    Nominal
                                </label>
                                <input
                                    id="nominal"
                                    type="number"
                                    {...field}
                                    placeholder="Masukkan Nominal"
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        if (/^[0-9]*\.?[0-9]*$/.test(value)) {
                                            field.onChange(value);
                                        }
                                    }}
                                    className={`border rounded-[10px] h-10 px-3 text-[#549EFF] ${errors.nominal ? "input-error" : "border-[#549EFF] placeholder-blue"}`}
                                />
                                {errors.nominal && <span className="text-red-500">{errors.nominal.message}</span>}
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name="pin"
                        render={({ field }) => (
                            <>
                                <label htmlFor="pin" className="font-medium">
                                    PIN Transaksi
                                </label>
                                <input
                                    maxLength={6}
                                    id="pin"
                                    type="password"
                                    {...field}
                                    placeholder="Masukkan PIN"
                                    className={`border rounded-[10px] h-10 px-3 text-[#549EFF] ${errors.pin ? "input-error" : "border-[#549EFF] placeholder-blue"}`}
                                />
                                {errors.pin && <span className="text-red-500">{errors.pin.message}</span>}
                            </>
                        )}
                    />
                </div>
                <Alert message={alertMessage} isVisible={isAlertVisible} />
                <Button type="submit" className="w-[305px] bg-primary">
                    Selanjutnya
                </Button>
            </form>
            <div className="w-full flex flex-col gap-3 bg-[#EFEFEF] border rounded-xl p-3">
                <p className="font-bold text-primary">Keterangan</p>
                <div className="text-sm">
                    <p>1. Pilih Rekening Sumber</p>
                    <p>2. Masukkan PIN Simple Bank</p>
                    <p>3. Masukkan Nominal yang akan Anda bayar</p>
                    <p>4. Tunjukkan QR Code kepada penjual</p>
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
        </QrisContentTemplate>
    );
};
