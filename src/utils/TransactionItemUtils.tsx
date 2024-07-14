import Income from "../assets/icons/income.png"
import Outcome from "../assets/icons/outcome.png"

export interface TransactionItemUtils {
  id: string
  icon: string
  label: string
  value: number | string
  color: string
}

export const transactions: TransactionItemUtils[] = [
  {
    id: "income-transaction",
    icon: Income,
    label: "Pemasukan",
    value: "Rp.34.678.990,00-",
    color: "E7EDFF",
  },
  {
    id: "expense-transaction",
    icon: Outcome,
    label: "Pengeluaran",
    value: "Rp.14.678.990,00-",
    color: "FFE0EB",
  },
]
