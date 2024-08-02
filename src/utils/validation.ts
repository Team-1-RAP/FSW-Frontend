export const validateAccountNumber = (accountNumber: string): string | null => {
    if (accountNumber.trim() === "") {
        return "Nomor rekening tidak boleh kosong.";
    }

    if (!/^\d+$/.test(accountNumber)) {
        return "Nomor rekening hanya boleh berisi angka dan tidak boleh mengandung tanda minus.";
    }

    if (accountNumber.length < 8) {
        return "Nomor rekening harus memiliki setidaknya 8 digit.";
    }

    return null;
};

export const validatePin = (pin: string): string | null => {
    if (pin.length !== 6) {
        return "Pin harus terdiri dari 6 digit.";
    }
    return null;
};
