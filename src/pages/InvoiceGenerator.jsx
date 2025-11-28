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

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber(),
    }));
  }, []);

  const computed = useMemo(() => {
    const subtotal = data.services.reduce(
      (s, item) => s + Number(item.amount || 0),
      0
    );

    const discountAmount = (subtotal * (Number(data.discount) || 0)) / 100;
    const total = +(subtotal - discountAmount).toFixed(2);

    return {
      subtotal,
      discountAmount: +discountAmount.toFixed(2),
      total,
    };
  }, [data.services, data.discount]);

  return (
    <div className="min-h-screen w-full p-4 md:p-10 bg-gray-100 flex flex-col md:flex-row gap-6">

      {/* FORM */}
      <div className="w-full md:w-[350px] flex-shrink-0">
        <InvoiceForm data={data} setData={setData} computed={computed} />
      </div>

      {/* PREVIEW + DOWNLOAD */}
      <div className="w-full flex flex-col items-center">

        <div className="overflow-x-auto">
          <InvoicePreview data={data} computed={computed} />
        </div>

        <InvoiceDownload onDownload={downloadPDF} />
      </div>

    </div>
  );
};

export default InvoiceGenerator;
