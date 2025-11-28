import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export const downloadPDF = async () => {
  const invoice = document.getElementById("invoice");
  if (!invoice) return;

  try {
    const dataUrl = await toPng(invoice, { quality: 1, pixelRatio: 3 });
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const imgHeight = (img.height * pdfWidth) / img.width;
      const y = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;

      pdf.addImage(dataUrl, "PNG", 0, y, pdfWidth, imgHeight);
      pdf.save("invoice.pdf");
    };
  } catch (err) {
    console.error("PDF generation error:", err);
  }
};
