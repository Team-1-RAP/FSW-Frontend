export interface AccountType {
    id: number;
    code: string;
    type: string;
    created_at: string;
    updated_at: string;
}

export interface AccountTypeRadioProps {
    type: AccountType;
    selectedId: number | null;
    onChange: (id: number) => void;
}
