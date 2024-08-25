import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterContext } from "../../../context/RegisterContext";

interface AccountType {
    id: number;
    code: string;
    type: string;
    created_at: string;
    updated_at: string;
}

const TypeRekeningPage: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(RegisterContext);
    const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { accountTypeId, setAccountTypeId, username, email, otp } = context;

    useEffect(() => {
        const fetchAccountTypes = async () => {
            try {
                const response = await fetch("https://simplebank.my.id/v1/account/type/accountTypes");
                if (!response.ok) {
                    throw new Error("Failed to fetch account types");
                }
                const result = await response.json();
                setAccountTypes(result.data);
            } catch (error) {
                console.error("Error fetching account types:", error);
            }
        };

        fetchAccountTypes();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTypeId = Number(event.target.value); // Convert value to number directly
        setAccountTypeId(newTypeId); // Update context directly
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (accountTypeId !== null) {
            console.log("User Details:", { username, email, otp, accountTypeId });
            navigate("/register/data-diri");
        } else {
            console.error("Please select an account type.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-[340px] mb-20">
            <h1 className="text-[28px] font-medium">Pilih Jenis Rekening</h1>
            <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="flex w-full space-y-2">
                    <div className="flex flex-col w-full space-y-6">
                        {accountTypes.map((type) => (
                            <div key={type.id} className="flex flex-row space-x-3 border border-[#C4C4C4] px-4 py-2 rounded-xl">
                                <input
                                    type="radio"
                                    name="jenisRekening"
                                    id={`type-${type.id}`} // Unique id based on type.id
                                    value={type.id} // Use id as value
                                    checked={accountTypeId === type.id}
                                    onChange={handleChange}
                                    className="w-[20px]"
                                />
                                <div className="space-y-1">
                                    <label htmlFor={`type-${type.id}`} className="text-lg">
                                        {type.type}
                                    </label>
                                    <p className="text-[9px] text-[#A09FA4]">
                                        {type.type === "BRONZE" && "Rekening pemula dengan layanan dasar dan biaya rendah"}
                                        {type.type === "GOLD" && "Rekening dengan fitur tambahan dan layanan prioritas"}
                                        {type.type === "PLATINUM" && "Rekening premium dengan layanan eksklusif"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-row justify-center w-full space-x-4 text-base font-bold">
                    <button type="submit" className="py-3 bg-[#055287] rounded-lg text-white w-1/2">
                        Selanjutnya
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TypeRekeningPage;
