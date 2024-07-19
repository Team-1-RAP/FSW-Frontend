import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import ServiceButton from "../../components/elements/home/ServiceButton"
import { services } from "../../utils/ServiceButtonUtils"
import TransactionItem from "../../components/elements/home/TransactionItem"
import { transactions } from "../../utils/TransactionItemUtils"
import Card from "../../components/fragments/Card"
import ScoreCard from "../../components/fragments/ScoreCard"
import MutasiItems from "../../components/elements/home/MutasiItems"
import { mutasiItems } from "../../utils/MutasiItemsUtils"
import { useAccount } from "../../hooks/useAccount"

const HomePage: React.FC = () => {
  const { accounts, fetchAccounts } = useAccount()
  const [currentAccountIndex, setCurrentAccountIndex] = useState(0)

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token) {
      fetchAccounts(token)
    }
  }, [fetchAccounts])

  const handleChangeCard = () => {
    setCurrentAccountIndex((prevIndex) => (accounts ? (prevIndex + 1) % accounts.length : 0))
  }

  const currentAccount = accounts ? accounts[currentAccountIndex] : null

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:space-x-6 lg:ml-12">
        <div className="lg:w-[415px]">
          <div className="flex justify-between">
            <h1 className="text-[22px] text-[#343C6A] font-semibold" aria-label="Rekeningku" role="heading">
              Rekeningku
            </h1>
            <button className="flex items-center" onClick={handleChangeCard}>
              <p className="text-[#838383] text-[15px] font-semibold">Ganti kartu</p>
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
            </button>
          </div>
          <div className="mt-3 grid justify-center">
            {currentAccount && <Card variant="purpleCyan" size="lg" userFullName={currentAccount.fullName} userCardNumber={currentAccount.cardNumber} userCardExpiration={new Date(currentAccount.expDate)} />}
          </div>
          <div className="mt-4">{currentAccount && <ScoreCard imgFile="balance-icon.png" title="Saldo Rekening" value={currentAccount.balance} isVisible={false} />}</div>
          <div className="mt-4 grid gap-3 shadow-md p-7 rounded-3xl bg-white" aria-label="Mutasi Terbaru" role="log">
            {mutasiItems.map((mutasi) => (
              <MutasiItems key={mutasi.id} id={mutasi.id} icon={mutasi.icon} label={mutasi.label} value={mutasi.value} date={mutasi.date} />
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 space-y-6 mt-2 lg:space-y-0 lg:mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 gap-4">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} icon={transaction.icon} label={transaction.label} value={transaction.value} color={transaction.color} />
            ))}
          </div>
          <h1 className="text-[15px] font-semibold ml-2 mt-4 md:mb-10 text-[#121F59]">Layanan Digital</h1>
          <div className="grid grid-cols-4 lg:gap-4 gap-4">
            {services.map((service, index) => (
              <ServiceButton key={index} id={service.id} icon={service.icon} label={service.label} link={service.link} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default HomePage
