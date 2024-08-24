import React from "react";
import { Clock } from "react-feather";
import { useNavigate } from "react-router-dom";

interface FinishPageProps {
    path: string;
    buttonText: string;
    title: string;
    message: string;
}

const FinishPage: React.FC<FinishPageProps> = ({ path, buttonText, title, message }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(path);
    };

    return (
        <div className="text-center w-[605px] flex flex-col items-center gap-4">
            <p className="font-medium text-[28px]">{title}</p>
            <Clock className="text-[#055287] stroke-[3px] rounded-full" size={139} />
            <p className="text-base font-normal">{message}</p>
            <button type="button" className="bg-[#0066AE] h-12 rounded-xl text-white hover:bg-sky-900 focus:bg-sky-950 px-5 font-bold" onClick={handleButtonClick}>
                {buttonText}
            </button>
        </div>
    );
};

export default FinishPage;
