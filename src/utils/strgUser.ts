import { Account } from "../features/home/transfer/type";

/**
 * Saves a list of accounts to localStorage for the given user token.
 *
 * @param authToken - The authentication token of the currently logged-in user.
 * @param newAccount - The new account details to be added to the list.
 * @returns A boolean indicating whether the account was successfully added.
 */
export const saveAccountToLocalStorage = (authToken: string, newAccount: Account): boolean => {
    // Create a unique key using the auth token
    const key = `accounts_${authToken}`;

    // Retrieve existing accounts for the user
    const existingAccounts: Account[] = JSON.parse(localStorage.getItem(key) || "[]");

    // Check if the account already exists
    const isDuplicate = existingAccounts.some((account) => account.accountNumber === newAccount.accountNumber);

    if (isDuplicate) {
        alert("Akun ini sudah ada di daftar.");
        return false; // Indicate that the account was not added
    }

    // Add the new account to the list
    existingAccounts.push(newAccount);

    // Save the updated list back to localStorage
    localStorage.setItem(key, JSON.stringify(existingAccounts));

    alert("Data rekening disimpan di localStorage!");
    return true; // Indicate that the account was successfully added
};
