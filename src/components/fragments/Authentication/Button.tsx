import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ type = "button", onClick, children, className }) => {
    return (
        <button type={type} onClick={onClick} className={`bg-[#0082FA] py-[10px] px-[60px] rounded-[12px] text-white text-base border-[#5375EC] border-2 ${className}`}>
            {children}
        </button>
    );
};

export default Button;
