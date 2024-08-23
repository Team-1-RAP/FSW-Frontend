import React from "react";

interface FormFieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    minLength?: number;
    maxLength?: number;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, type, value, onChange, minLength, maxLength }) => (
    <div className="space-y-1">
        <label htmlFor={id} className="block text-xs font-light">
            {label}
        </label>
        <input type={type} id={id} value={value} maxLength={maxLength} onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>)} minLength={minLength} className="w-full p-3 border rounded-lg border-[#C4C4C4]" required />
    </div>
);

export default FormField;
