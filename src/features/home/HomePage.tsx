import React, { useEffect } from "react";
import ServiceButton from "../../components/elements/home/ServiceButton";
import { services } from "../../utils/ServiceButtonUtils";
import TransactionItem from "../../components/elements/home/TransactionItem";
import Card from "../../components/fragments/Card";
import MutasiItems from "../../components/elements/home/MutasiItems";
import { mutasiItems } from "../../utils/MutasiItemsUtils";
import { useAccount } from "../../hooks/useAccount";
import { useMutation } from "../../hooks/useMutation";
import BalanceItem from "../../components/elements/home/BalanceItem";
import Income from "../../assets/icons/income.png";
import Outcome from "../../assets/icons/outcome.png";
import { useToggle } from "../../hooks/useToggle";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const { accounts, fetchAccounts, activeAccountIndex } = useAccount();
  const [isRefresh, setRefresh] = useToggle(true);
  const { mutationAmounts, fetchMutationAmounts } = useMutation();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && isRefresh) {
      fetchAccounts(token);
      if (accounts && accounts.length > 0) {
        fetchMutationAmounts(
          token,
          parseInt(accounts[activeAccountIndex].noAccount)
        );
      }
      setRefresh();
    }
  }, [
    fetchAccounts,
    isRefresh,
    setRefresh,
    accounts,
    activeAccountIndex,
    fetchMutationAmounts,
  ]);

  const currentAccount = accounts ? accounts[activeAccountIndex] : null;
  const currentMutationAmount = mutationAmounts
    ? mutationAmounts[activeAccountIndex]
    : null;

  return (
    <div className="flex flex-col xl:flex-row xl:space-x-6 xl:ml-12">
      <div className="xl:w-[415px]">
        <div className="flex justify-between">
          <h1
            className="text-[22px] text-[#343C6A] font-semibold"
            aria-label="Rekeningku"
            role="heading"
          >
            Rekeningku
          </h1>
          <Link className="flex items-center" to="/profile">
            <p className="text-[#838383] text-[15px] font-semibold">
              Ganti kartu
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#235697"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ms-3 icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </Link>
        </div>
        <div className="mt-3 grid justify-center">
          {currentAccount && (
            <Card
              variant="purpleCyan"
              size="lg"
              userFullName={currentAccount.fullName}
              userCardNumber={currentAccount.cardNumber}
              userCardExpiration={new Date(currentAccount.expDate)}
            />
          )}
        </div>
        <div className="mt-4">
          {currentAccount && (
            <BalanceItem
              imgFile="balance-icon.png"
              title="Saldo Rekening"
              value1={currentAccount.noAccount}
              value2={currentAccount.balance}
              isVisible={false}
            />
          )}
        </div>
        <div
          className="mt-4 sm:mb-10 grid gap-3 shadow-md p-7 rounded-3xl bg-white"
          aria-label="Mutasi Terbaru"
          role="log"
        >
          {mutasiItems.length === 0 ? (
            <div className="text-center xl:text-[16px] text-[#718EBF]">
              Belum ada mutasi
            </div>
          ) : (
            mutasiItems.map((mutasi) => (
              <MutasiItems
                key={mutasi.id}
                id={mutasi.id}
                icon={mutasi.icon}
                label={mutasi.label}
                value={mutasi.value}
                date={mutasi.date}
              />
            ))
          )}
        </div>
      </div>

      <div className="space-y-6 mt-4 xl:space-y-0 xl:mt-0">
        <div className="flex flex-wrap xl:flex-row gap-4 lg:gap-7 xl:gap-4">
          <TransactionItem
            key="income-transaction"
            icon={Income}
            label="Pemasukan"
            value={currentMutationAmount ? currentMutationAmount.income : 0}
            color="E7EDFF"
          />

          <TransactionItem
            key="expense-transaction"
            icon={Outcome}
            label="Pengeluaran"
            value={currentMutationAmount ? currentMutationAmount.spending : 0}
            color="FFE0EB"
          />
        </div>
        <h1 className="text-[15px] font-semibold ml-2 mt-4 md:mb-10 text-[#121F59]">
          Layanan Digital
        </h1>
        <div className="flex flex-wrap lg:gap-4">
          {services.map((service, index) => (
            <ServiceButton
              key={index}
              id={service.id}
              icon={service.icon}
              label={service.label}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
