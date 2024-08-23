/**
 * Formats a date string into Indonesian date and time formats.
 *
 * @param dateString - The date string to format.
 * @returns An object containing the formatted date and time.
 */
export const formatDate = (dateString: string): { formattedDate: string; formattedTime: string } => {
    const date = new Date(dateString);

    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Jakarta",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
        hour12: false,
    };

    const formattedDate = date.toLocaleDateString("id-ID", dateOptions);
    const formattedTime = date.toLocaleTimeString("id-ID", timeOptions).replace(/\./g, ":") + " WIB";

    return { formattedDate, formattedTime };
};
