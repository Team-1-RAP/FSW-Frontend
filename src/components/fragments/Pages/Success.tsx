import React from "react";
import { Clock, Check } from "react-feather"; // Import the icons you need
import { useNavigate } from "react-router-dom";

// Define the type for the icon prop
type IconType = "clock" | "check";

interface FinishPageProps {
    path: string;
    buttonText: string;
    title: string;
    message: string;
    icon: IconType;
}

const Success: React.FC<FinishPageProps> = ({ path, buttonText, title, message, icon }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(path);
    };

    const renderIcon = () => {
        switch (icon) {
            case "check":
                return (
                    <div className="bg-[#055287] p-8 rounded-full">
                        <Check className="text-white stroke-[3px]" size={85} />
                    </div>
                );
            case "clock":
            default:
                return <Clock className="text-[#055287] stroke-[3px] rounded-full" size={139} />;
        }
    };

    return (
        <div className="text-center w-[605px] flex flex-col items-center gap-4">
            <p className="font-medium text-[28px]">{title}</p>
            {renderIcon()}
            <p className="text-base font-normal">{message}</p>
            <button type="button" className="bg-[#0066AE] h-12 rounded-xl text-white hover:bg-sky-900 focus:bg-sky-950 px-5 font-bold" onClick={handleButtonClick}>
                {buttonText}
            </button>
        </div>
    );
};

export default Success;
