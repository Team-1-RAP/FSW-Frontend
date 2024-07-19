import Income from "../assets/icons/income.png";
import Outcome from "../assets/icons/outcome.png";

export interface TransactionItemUtils {
  id: string;
  icon: string;
  label: string;
  value: number;
  color: string;
}

export const transactions: TransactionItemUtils[] = [
  {
    id: "income-transaction",
    icon: Income,
    label: "Pemasukan",
    value: 34678990,
    color: "E7EDFF",
  },
  {
    id: "expense-transaction",
    icon: Outcome,
    label: "Pengeluaran",
    value: 14678990,
    color: "FFE0EB",
  },
];
