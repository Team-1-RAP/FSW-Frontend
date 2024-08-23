export interface AccountPurpose {
    id: number;
    type: string;
}
export const fetchAccountPurposes = async (): Promise<AccountPurpose[]> => {
    try {
        const response = await fetch("https://simplebank.my.id/v1/account/purposes/accountPurposes");
        const result = await response.json();
        if (result.status) {
            return result.data;
        } else {
            console.error("Failed to fetch account purposes");
            return [];
        }
    } catch (error) {
        console.error("Error fetching account purposes:", error);
        return [];
    }
};

export const isOver17YearsOld = (birthDate: string): boolean => {
    const currentDate = new Date();
    const birth = new Date(birthDate);
    const age = currentDate.getFullYear() - birth.getFullYear();
    const monthDiff = currentDate.getMonth() - birth.getMonth();
    return monthDiff > 0 || (monthDiff === 0 && currentDate.getDate() >= birth.getDate()) ? age >= 17 : age - 1 >= 17;
};
