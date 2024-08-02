import DashboardLayout from "../../../components/layouts/DashboardLayout";
import HouseIcon from "../../../assets/icons/house_dark.png";
import { ChevronRight, RefreshCw } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Account } from "./type";

const TransferPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();

    const handleAccountClick = (account: Account) => {
        navigate("/home/transfer/nominal", {
            state: {
                accountNumber: account.accountNumber,
                accountName: account.ownerName,
                bankName: account.bankName,
            },
        });
    };

    useEffect(() => {
        // Get the list of accounts from localStorage
        const token = sessionStorage.getItem("token");
        const savedAccounts = JSON.parse(localStorage.getItem("accounts_" + token) || "[]");
        setAccounts(savedAccounts);
    }, []);

    const filteredAccounts = accounts.filter((account) => account.ownerName.toLowerCase().includes(searchTerm.toLowerCase()));

    function handeleNewTransfer() {
        navigate("/home/transfer/new");
    }

    return (
        <DashboardLayout>
            <div className="w-full lg:w-11/12 h-screen bg-white rounded-[20px] lg:ml-12 mt-10 lg:mt-0 lg:mb-10">
                {/* Navigation */}
                <div className="flex flex-col ml-8 gap-5">
                    <div className="flex flex-row space-x-2 mt-5">
                        <img src={HouseIcon} alt="" width={24} height={24} />
                        <p className="font-normal text-[#235697] text-sm mt-1">Beranda</p>
                        <ChevronRight className="text-[#235697]" />
                        <RefreshCw className="text-[#235697]" />
                        <p className="font-normal text-[#235697] text-sm mt-1">Transfer</p>
                    </div>
                    <hr className="w-[90%] border-t-1 border-[#235697]" />
                </div>

                {/* Content */}
                <div className="flex flex-col ml-8 gap-5 mt-3 pr-2 lg:pr-0">
                    <h1 className="font-semibold text-[22px] text-[#343C6A]">Transfer</h1>

                    <button className="bg-[#549EFF] w-[209px] h-[39px] rounded-[10px] border border-[#549EFF] text-white font-normal text-base" onClick={handeleNewTransfer}>
                        Transfer Baru
                    </button>

                    <div className="flex flex-col border border-[#DDDDDD] w-[390px] h-auto rounded-[10px] gap-3 p-5">
                        <h1 className="font-medium text-lg text-[#343C6A]">Daftar Transfer</h1>
                        <div className="flex flex-row">
                            <div className="relative">
                                <input
                                    className="appearance-none border border-[#235697] rounded-2xl transition-colors w-[360px] h-[48px] py-2 px-3 text-[#235697] placeholder:text-[#235697] leading-tight focus:outline-none text-base"
                                    id="username"
                                    type="text"
                                    placeholder="Cari daftar transfer..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {filteredAccounts.map((account) => (
                            <div key={account.accountNumber} className="flex flex-row rounded-lg w-[390px] h-full space-x-3 cursor-pointer" onClick={() => handleAccountClick(account)}>
                                <div className="flex items-center justify-center rounded-full w-[30px] h-[30px] bg-[#FF47ED]">
                                    <p className="text-center font-medium text-base">A</p>
                                </div>
                                <h1 className="font-normal text-base">{account.ownerName}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TransferPage;
