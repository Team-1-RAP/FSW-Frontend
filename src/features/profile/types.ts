import { CardProps } from "../../components/fragments/Card/types";

export interface CardInfo extends CardProps {
    noAccount: string;
    accountType: string;
    balance: number;
}