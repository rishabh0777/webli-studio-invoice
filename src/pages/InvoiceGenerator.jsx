import React, { useEffect, useMemo, useState } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";
import InvoiceDownload from "../components/InvoiceDownload";
import { downloadPDF } from "../utils/pdf";
import { generateInvoiceNumber } from "../utils/invoiceNumber";

const InvoiceGenerator = () => {
  const [data, setData] = useState({
    clientName: "",
    brandName: "",
    clientEmail: "",
    invoiceNumber: "",
    date: "",
    dueDate: "",
    discount: 0,
    amountPaid: 0,
    status: "",
    notes: "",
    terms: "",
    upi: "webli@upi",
    services: [{ title: "", amount: "" }],
  });

  // Generate invoice id on first load
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber(),
    }));
  }, []);

  // compute totals
  const computed = useMemo(() => {
    const subtotal = data.services.reduce(
      (s, item) => s + Number(item.amount || 0),
      0
    );
    const discountAmount =
      (subtotal * (Number(data.discount || 0))) / 100;
    const total = +(subtotal - discountAmount).toFixed(2);

    return {
      subtotal,
      discountAmount: +discountAmount.toFixed(2),
      total,
    };
  }, [data.services, data.discount]);

  return (
    <div className="min-h-screen bg-gray-100 flex gap-10 p-10">
      <InvoiceForm data={data} setData={setData} computed={computed} />

      <div>
        <InvoicePreview data={data} computed={computed} />
        <InvoiceDownload onDownload={downloadPDF} />
      </div>
    </div>
  );
};

export default InvoiceGenerator;
