import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPDF = async (receiptNumber = "") => {
  const receipt = document.getElementById("invoice");
  if (!receipt) return;

  /* Capture at the sheet's natural 210mm width, ignoring the preview zoom. */
  const scaler = receipt.parentElement;
  const previousTransform = scaler ? scaler.style.transform : "";

  try {
    if (scaler) scaler.style.transform = "none";

    const canvas = await html2canvas(receipt, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.85);

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      pdfWidth,
      pdfHeight,
      undefined,
      "FAST"
    );

    pdf.save(receiptNumber ? `receipt-${receiptNumber}.pdf` : "receipt.pdf");
  } catch (err) {
    console.error("PDF generation error:", err);
  } finally {
    if (scaler) scaler.style.transform = previousTransform;
  }
};
