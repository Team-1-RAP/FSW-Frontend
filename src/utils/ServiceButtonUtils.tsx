import QRIS from "../assets/icons/qris.png";
import Transfer from "../assets/icons/transfer.png";
import Wallet from "../assets/icons/wallet.png";
import Receipt from "../assets/icons/receipt.png";
import FileAdd from "../assets/icons/FilePlus.png";
import HandShake from "../assets/icons/handshake.png";
import Dollar from "../assets/icons/dollar.png";
import More from "../assets/icons/more.png";

export interface ServiceButtonUtils {
    id: string;
    icon: string;
    label: string;
    link: string;
}

export const services: ServiceButtonUtils[] = [
    {
        id: "QRIS-Services",
        icon: QRIS,
        label: "QRIS",
        link: "/qris",
    },
    {
        id: "Transfer-Services",
        icon: Transfer,
        label: "Transfer",
        link: "/transfer",
    },
    {
        id: "Top-Up-E-Wallet-Services",
        icon: Wallet,
        label: "Top Up E-Wallet",
        link: "/topup-e-wallet",
    },
    {
        id: "Virtual-Account-Services",
        icon: Receipt,
        label: "Virtual Account",
        link: "/virtual-account",
    },
    {
        id: "Tambah-Rekening-Services",
        icon: FileAdd,
        label: "Tambah Rekening",
        link: "/new-account/",
    },
    {
        id: "Simpan-Pinjam-Services",
        icon: HandShake,
        label: "Simpan Pinjam",
        link: "/saving-loan",
    },
    {
        id: "Simpan-Valas-Services",
        icon: Dollar,
        label: "Simpan Valas",
        link: "/foreign-exchange",
    },
    {
        id: "Lainnya-Services",
        icon: More,
        label: "Lainnya",
        link: "/others",
    },
];
