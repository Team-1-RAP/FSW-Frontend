import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type = "button", onClick, children, className, disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-[#0082FA] py-[10px] px-[60px] rounded-[12px] text-white text-base border-[#5375EC] border-2 ${className} ${disabled ? "bg-[#c4c4c4] cursor-not-allowed" : ""}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
