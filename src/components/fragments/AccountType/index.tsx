import React from "react";
import { AccountTypeRadioProps } from "./type";

const AccountTypeRadio: React.FC<AccountTypeRadioProps> = ({ type, selectedId, onChange }) => (
    <div className="flex flex-row space-x-3 border border-[#C4C4C4] px-4 py-2 rounded-xl">
        <input type="radio" name="jenisRekening" id={`type-${type.id}`} value={type.id} checked={selectedId === type.id} onChange={() => onChange(type.id)} className="w-[20px]" />
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
);

export default AccountTypeRadio;
