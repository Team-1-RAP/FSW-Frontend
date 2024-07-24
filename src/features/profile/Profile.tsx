import React, { useState } from "react";
import Card from "../../components/fragments/Card";
import ScoreCard from "../../components/fragments/ScoreCard";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { ChevronRight } from "react-feather";
import { CardSelection } from "../../components/fragments/CardSelection";
import { CardInfo } from "./types";
// import { useAccount } from "../../hooks/useAccount";

const Profile: React.FC = () => {
  const [isDropdownOpen, setIsDropDownOpen] = useState<boolean>(false);
  // const { accounts, user, fetchAccounts, fetchUserInfo } = useAccount();
  const [activeAccount, setActiveAccount] = useState<number>(0);
  // const [isRefresh, setRefresh] = useState(true);
  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (token && isRefresh) {
  //     fetchAccounts(token);
  //     fetchUserInfo(token);
  //     setRefresh(false);
  //   }
  // }, [fetchAccounts, fetchUserInfo, isRefresh]);
  // const cards: CardInfo[] =
  //   accounts?.map((account) => {
  //     return {
  //       userFullName: account.fullName,
  //       userCardExpiration: new Date(account.expDate),
  //       userCardNumber: account.cardNumber,
  //       noAccount: account.noAccount.toString(),
  //       accountType: account.accountType,
  //       balance: account.balance,
  //     };
  //   }) ?? [];

  // const userInfo = {
  //   username: user?.username ?? "",
  //   phoneNumber: user?.phoneNumber ?? "",
  //   email: user?.email ?? "",
  // };

  const cards: CardInfo[] = [
    {
      userFullName: "John Doe",
      userCardExpiration: new Date(2029, 1),
      userCardNumber: "1234 5678 910",
      noAccount: "3737657598213561",
      accountType: "Gold",
      balance: 100000000,
    },
    {
      userFullName: "Adilla Wulandari",
      userCardExpiration: new Date(2028, 10),
      userCardNumber: "1234 5678 910",
      noAccount: "3737657598233361",
      accountType: "Bronze",
      balance: 100000000,
    },
    {
      userFullName: "Adilla Wulandari",
      userCardExpiration: new Date(2028, 10),
      userCardNumber: "1234 5678 910",
      noAccount: "3737657598213532",
      accountType: "Silver",
      balance: 100000000,
    },
  ];

  const userInfo = {
    username: "adila24",
    phoneNumber: "+6281234567890",
    email: "adila24@gmail.com",
  };

  const handleCardChange = (index: number) => {
    setActiveAccount(index);
    setIsDropDownOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="w-full flex flex-col">
        <div className="flex mx-8">
          <div
            className="lg:w-3/12 w-1/2 font-semibold text-xl text-[#343C6A]"
            tabIndex={0}
          >
            Rekeningku
          </div>
          <div className="lg:w-3/12 w-1/2 flex justify-end">
            <button
              className="text-[#838383] text-base z-10"
              onClick={() => setIsDropDownOpen(!isDropdownOpen)}
            >
              Ganti Kartu
              <ChevronRight
                className="inline-block text-black ms-3"
                size={12}
              />
            </button>
          </div>
          <div className="lg:w-2/12 w-full flex justify-start">
            {isDropdownOpen && (
              <div className="absolute">
                <div className="flex flex-col gap-1 border rounded-lg bg-white p-1.5">
                  {cards.map((card, index) => (
                    <CardSelection
                      key={index}
                      accountType={card.accountType}
                      accountNumber={card.noAccount}
                      buttonFunction={() => handleCardChange(index)}
                      isActive={activeAccount === index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-11 flex lg:w-100 sm:mx-8">
          <div className="lg:w-1/2 w-full flex justify-center">
            <Card
              userFullName={cards[activeAccount].userFullName}
              userCardNumber={cards[activeAccount].userCardNumber}
              userCardExpiration={cards[activeAccount].userCardExpiration}
            />
          </div>
        </div>
        <div className="flex xl:flex-row flex-col gap-3 mt-10 mx-8">
          <div className="xl:w-1/3 w-full">
            <ScoreCard
              imgFile="income-icon.png"
              title="Pengeluaran"
              value1={34678990}
            />
          </div>
          <div className="xl:w-1/3 w-full">
            <ScoreCard
              imgFile="balance-icon.png"
              title="Saldo Rekening"
              // value={accounts ? accounts[activeAccount].balance : 0}
              value1={cards[activeAccount].balance}
              value2={cards[activeAccount].noAccount}
              isVisible={false}
            />
          </div>
          <div className="xl:w-1/3 w-full">
            <ScoreCard
              imgFile="expense-icon.png"
              title="Pemasukan"
              value1={14678990}
            />
          </div>
        </div>
        <div className="flex flex-col gap-12 my-12 sm:mx-8 mx-4">
          <div className="bg-white flex flex-col w-full gap-5 py-8 px-10">
            <p className="font-bold text-xl text-[#343C6A]">
              Informasi Kartu Simple Bank
            </p>
            <div className="flex">
              <span className="w-1/3 text-xl text-[#343C6A]">
                Jenis Rekening
              </span>
              <span className="text-xl text-[#343C6A]">
                {cards[activeAccount].accountType}
              </span>
            </div>
            <div className="flex">
              <span className="w-1/3 text-xl text-[#343C6A]">Nama Pemilik</span>
              <span className="text-xl text-[#343C6A]">
                {cards[activeAccount].userFullName}
              </span>
            </div>
          </div>
          <div className="bg-white flex flex-col w-full gap-5 py-8 px-10">
            <p className="font-bold text-xl text-[#343C6A]">Informasi Akun</p>
            <div className="flex">
              <span className="w-1/3 text-xl text-[#343C6A]">Username</span>
              <span className="text-xl text-[#343C6A]">
                {userInfo.username}
              </span>
            </div>
            <div className="flex">
              <span className="w-1/3 text-xl text-[#343C6A]">
                Nomor telepon
              </span>
              <span className="text-xl text-[#343C6A]">
                {userInfo.phoneNumber}
              </span>
            </div>
            <div className="flex">
              <span className="w-1/3 text-xl text-[#343C6A]">Email</span>
              <span className="text-xl text-[#343C6A]">{userInfo.email}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
