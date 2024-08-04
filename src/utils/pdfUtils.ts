import jsPDF from "jspdf";

interface PDFOptions {
    formattedTime: string;
    formattedDate: string;
    recipientFullName: string;
    recipientBankName: string;
    recAccountNo: string;
    amount: number;
    senderFullName: string;
    docAccountNo: string;
    noRef: string;
}

export const downloadPDF = ({ formattedTime, formattedDate, recipientFullName, recipientBankName, recAccountNo, amount, senderFullName, docAccountNo, noRef }: PDFOptions) => {
    const doc = new jsPDF({ format: "a5" });

    // Add logo
    const logo =
        "data:image/png;base64,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";

    doc.addImage(logo, "PNG", 10, 10, 20, 20);

    // Add title
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Pembayaran Berhasil!", 10, 40);

    // Add date and time
    doc.setFontSize(12);
    doc.text(`${formattedTime}  •  ${formattedDate}`, 10, 45);

    // Add transfer title
    doc.setFont("Helvetica", "bold");
    doc.text("Transfer", 10, 50);

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, 55, 140, 55);

    // Add recipient details
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.text("Rekening tujuan", 10, 60);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${recipientFullName}`, 10, 65);
    doc.text(`${recipientBankName} - *****${recAccountNo}`, 10, 70);

    // Add transaction details
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.text("Detail Transaksi", 10, 75);

    doc.setFont("Helvetica", "bold");
    doc.text("Total Transaksi", 10, 81);
    doc.text(`Rp ${amount.toLocaleString()}`, 120, 81, { align: "right" });

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, 87, 140, 87);

    // Add funding source
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.text("Sumber Dana", 10, 95);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${senderFullName}`, 10, 101);
    doc.text(`SIMPLE BANK - *****${docAccountNo}`, 10, 107);

    // Add transaction ID
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.text("ID transaksi", 10, 115);

    doc.setFont("Helvetica", "bold");
    doc.text(`${noRef}`, 120, 115, { align: "right" });

    // Add footer
    doc.setFontSize(8);
    doc.setFont("Helvetica", "normal");
    doc.text("Copyright © 2024 - Simple Bank", 10, 130);

    // Save PDF
    doc.save("bukti_transfer.pdf");
};
