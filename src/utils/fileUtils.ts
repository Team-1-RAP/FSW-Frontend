export const validateFile = (file: File | null): boolean => {
    if (!file) return false;

    const validTypes = ["image/jpeg"];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (!validTypes.includes(file.type)) {
        alert("File harus berformat .jpg atau .jpeg");
        return false;
    }

    if (file.size > maxSize) {
        alert("File maksimal 2 MB");
        return false;
    }

    return true;
};
