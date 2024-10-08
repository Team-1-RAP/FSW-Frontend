import React, { useEffect, useState } from "react";
import Card from "../../components/fragments/Card";
import ScoreCard from "../../components/fragments/ScoreCard";
import { ChevronRight } from "react-feather";
import { CardSelection } from "../../components/fragments/CardSelection";
import { useAccount } from "../../hooks/useAccount";
import { useToggle } from "../../hooks/useToggle";
import { IAccount } from "../../context/AccountContext";
import { useMutation } from "../../hooks/useMutation";

const Profile: React.FC = () => {
  const [isDropdownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const {
    accounts,
    user,
    fetchAccounts,
    fetchUserInfo,
    activeAccountIndex,
    setActiveAccountIndex,
  } = useAccount();
  const [isRefresh, setRefresh] = useToggle(true);
  const { mutationAmounts, fetchMutationAmounts } = useMutation();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && isRefresh) {
      fetchAccounts(token);
      fetchUserInfo(token);
      fetchMutationAmounts;
      setRefresh();
    }
  }, [
    fetchAccounts,
    fetchMutationAmounts,
    fetchUserInfo,
    isRefresh,
    setRefresh,
  ]);

  const userInfo = {
    username: user?.username ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    email: user?.email ?? "",
  };

  const handleCardChange = (index: number) => {
    setActiveAccountIndex(index);
    setIsDropDownOpen(false);
  };

  const activeAccount = accounts
    ? accounts[activeAccountIndex]
    : ({} as IAccount);

  const currentMutationAmount = mutationAmounts[activeAccountIndex] ||
    mutationAmounts || {
      income: 0,
      spending: 0,
    };

  return (
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
            className="text-[#838383] text-base"
            onClick={() => setIsDropDownOpen(!isDropdownOpen)}
          >
            Ganti Kartu
            <ChevronRight className="inline-block text-black ms-3" size={12} />
          </button>
        </div>
        <div className="lg:w-2/12 flex justify-start">
          {isDropdownOpen && (
            <div className="absolute">
              <div className="flex flex-col gap-1 border rounded-lg bg-white p-1.5">
                {accounts?.map((account, index) => (
                  <CardSelection
                    key={index}
                    accountType={account.accountType}
                    accountNumber={account.cardNumber}
                    buttonFunction={() => handleCardChange(index)}
                    isActive={activeAccountIndex === index}
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
            userFullName={activeAccount.fullName}
            userCardNumber={activeAccount.cardNumber}
            userCardExpiration={new Date(activeAccount.expDate)}
          />
        </div>
      </div>
      <div className="flex xl:flex-row flex-col gap-3 mt-10 mx-8">
        <div className="xl:w-1/3 w-full">
          <ScoreCard
            imgFile="expense-icon.png"
            title="Pengeluaran"
            value1={currentMutationAmount ? currentMutationAmount.spending : 0}
          />
        </div>
        <div className="xl:w-1/3 w-full">
          <ScoreCard
            imgFile="balance-icon.png"
            title="Saldo Rekening"
            value1={activeAccount.balance}
            value2={activeAccount.noAccount}
            isVisible={false}
          />
        </div>
        <div className="xl:w-1/3 w-full">
          <ScoreCard
            imgFile="income-icon.png"
            title="Pemasukan"
            value1={currentMutationAmount ? currentMutationAmount.income : 0}
          />
        </div>
      </div>
      <div className="flex flex-col gap-12 my-12 sm:mx-8 mx-4">
        <div className="bg-white flex flex-col w-full gap-5 py-8 px-10">
          <p className="font-bold text-xl text-[#343C6A]">
            Informasi Kartu Simple Bank
          </p>
          <div className="flex">
            <span className="sm:w-1/3 w-1/2 text-xl text-[#343C6A]">
              Jenis Rekening
            </span>
            <span className="text-xl text-[#343C6A]">
              {activeAccount.accountType}
            </span>
          </div>
          <div className="flex">
            <span className="sm:w-1/3 w-1/2 text-xl text-[#343C6A]">
              Nama Pemilik
            </span>
            <span className="text-xl text-[#343C6A]">
              {activeAccount.fullName}
            </span>
          </div>
        </div>
        <div className="bg-white flex flex-col w-full gap-5 py-8 px-10">
          <p className="font-bold text-xl text-[#343C6A]">Informasi Akun</p>
          <div className="flex">
            <span className="sm:w-1/3 w-1/2 text-xl text-[#343C6A]">
              Username
            </span>
            <span className="text-xl text-[#343C6A]">{userInfo.username}</span>
          </div>
          <div className="flex">
            <span className="sm:w-1/3 w-1/2 text-xl text-[#343C6A]">
              Nomor telepon
            </span>
            <span className="text-xl text-[#343C6A]">
              {userInfo.phoneNumber}
            </span>
          </div>
          <div className="flex">
            <span className="sm:w-1/3 w-1/2 text-xl text-[#343C6A]">Email</span>
            <span className="text-xl text-[#343C6A]">{userInfo.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
