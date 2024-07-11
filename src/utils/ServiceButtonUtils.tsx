import TarikTunai from "../assets/images/icons/tarik-tunai.png";
import Transfer from "../assets/images/icons/transfer.png";
import TopUp from "../assets/images/icons/topup.png";
import VA from "../assets/images/icons/va.png";
import Investasi from "../assets/images/icons/investasi.png";
import Pinjam from "../assets/images/icons/pinjam.png";
import Valas from "../assets/images/icons/valas.png";
import More from "../assets/images/icons/lainnya.png";

export interface ServiceButtonUtils {
  id: string;
  icon: string;
  label: string;
  link: string;
}

export const services: ServiceButtonUtils[] = [
  {
    id: "Tarik-Tunai-Services",
    icon: TarikTunai,
    label: "Tarik Tunai",
    link: "/tarik-tunai",
  },
  {
    id: "Transfer-Services",
    icon: Transfer,
    label: "Transfer",
    link: "/transfer",
  },
  {
    id: "Top-Up-E-Wallet-Services",
    icon: TopUp,
    label: "Top Up E-Wallet",
    link: "/top-up-e-wallet",
  },
  {
    id: "Virtual-Account-Services",
    icon: VA,
    label: "Virtual Account",
    link: "/virtual-account",
  },
  {
    id: "Investasi-Services",
    icon: Investasi,
    label: "Investasi",
    link: "/investasi",
  },
  {
    id: "Simpan-Pinjam-Services",
    icon: Pinjam,
    label: "Simpan Pinjam",
    link: "/simpan-pinjam",
  },
  {
    id: "Simpan-Valas-Services",
    icon: Valas,
    label: "Simpan Valas",
    link: "/simpan-valas",
  },
  {
    id: "Lainnya-Services",
    icon: More,
    label: "Lainnya",
    link: "/lainnya",
  },
];
