import HandWithdraw from "../assets/icons/handwithdraw.png"
import Transfer from "../assets/icons/transfer.png"
import Wallet from "../assets/icons/wallet.png"
import Receipt from "../assets/icons/receipt.png"
import LineChart from "../assets/icons/linechart.png"
import HandShake from "../assets/icons/handshake.png"
import Dollar from "../assets/icons/dollar.png"
import More from "../assets/icons/more.png"

export interface ServiceButtonUtils {
  id: string
  icon: string
  label: string
  link: string
}

export const services: ServiceButtonUtils[] = [
  {
    id: "Tarik-Tunai-Services",
    icon: HandWithdraw,
    label: "Tarik Tunai",
    link: "/tarik-tunai",
  },
  {
    id: "Transfer-Services",
    icon: Transfer,
    label: "Transfer",
    link: "/home/transfer",
  },
  {
    id: "Top-Up-E-Wallet-Services",
    icon: Wallet,
    label: "Top Up E-Wallet",
    link: "/top-up-e-wallet",
  },
  {
    id: "Virtual-Account-Services",
    icon: Receipt,
    label: "Virtual Account",
    link: "/virtual-account",
  },
  {
    id: "Investasi-Services",
    icon: LineChart,
    label: "Investasi",
    link: "/investasi",
  },
  {
    id: "Simpan-Pinjam-Services",
    icon: HandShake,
    label: "Simpan Pinjam",
    link: "/simpan-pinjam",
  },
  {
    id: "Simpan-Valas-Services",
    icon: Dollar,
    label: "Simpan Valas",
    link: "/simpan-valas",
  },
  {
    id: "Lainnya-Services",
    icon: More,
    label: "Lainnya",
    link: "/lainnya",
  },
]
