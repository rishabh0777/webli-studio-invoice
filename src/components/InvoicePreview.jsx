import React from "react";

const InvoicePreview = ({ data, computed }) => {
  const { subtotal, discountAmount, total } = computed;

  const amountPaid = Number(data.amountPaid) || 0;
  const balance = +(total - amountPaid).toFixed(2);

  let status = data.status;
  if (!status) {
    if (amountPaid === 0) status = "unpaid";
    else if (amountPaid >= total) status = "paid";
    else status = "partial";
  }

  return (
<div 
  id="invoice" 
  className="relative w-[600px] max-w-full bg-white flex shadow-2xl overflow-hidden mx-auto"
>


      {/* LEFT STRIP */}
      <div className="w-[32%] bg-black flex justify-center items-center overflow-hidden">
        <div className="-rotate-90">
          <img src="/primaryLogoEnhanced.jpg" alt="webli" className="scale-[2.5] w-auto" />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[68%] bg-[#fafafa] p-10 flex flex-col gap-6">

        {/* HEADER */}
        <div className="flex justify-between border-b-2 border-gray-200 pb-4">
          <div>
            <h1 className="text-xl tracking-[2px] font-bold">INVOICE</h1>
            <p className="text-sm opacity-70 mt-1">{data.invoiceNumber}</p>
          </div>

          <div className="text-sm">
            <p><span className="font-semibold">Date:</span> {data.date}</p>
            <p><span className="font-semibold">Due:</span> {data.dueDate}</p>
          </div>
        </div>

        {/* STATUS BADGE */}
        <div className="flex justify-end">
          <span
            className={
              "text-xs px-3 py-1 rounded-full font-semibold " +
              (status === "paid"
                ? "bg-green-100 text-green-700"
                : status === "unpaid"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700")
            }
          >
            {status === "paid" ? "PAID" : status === "unpaid" ? "UNPAID" : "PARTIALLY PAID"}
          </span>
        </div>

        {/* CLIENT INFO */}
        <div>
          <h2 className="text-base font-semibold mb-2">Bill To</h2>
          <p className="text-sm">{data.clientName}</p>
          <p className="text-sm">{data.brandName}</p>
          <p className="text-sm">{data.clientEmail}</p>
        </div>

        {/* TABLE */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left font-semibold pb-2 border-b-2 border-gray-300">Description</th>
              <th className="text-right font-semibold pb-2 border-b-2 border-gray-300">Amount</th>
            </tr>
          </thead>

          <tbody>
            {data.services.map((s, i) => (
              <tr key={i}>
                <td className="py-2 border-b border-gray-200 text-sm">{s.title}</td>
                <td className="py-2 border-b border-gray-200 text-sm text-right">₹{s.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div className="text-right border-t-2 border-black pt-4">
          <p className="text-sm"><span className="font-semibold">Subtotal:</span> ₹{subtotal}</p>
          <p className="text-sm"><span className="font-semibold">Discount ({data.discount}%):</span> ₹{discountAmount}</p>
          <p className="text-sm"><span className="font-semibold">Amount Paid:</span> ₹{amountPaid}</p>
          <p className="text-sm"><span className="font-semibold">Balance:</span> ₹{balance}</p>

          <p className="text-lg font-bold mt-1">Total: ₹{total}</p>
        </div>

        {/* NOTES */}
        {data.notes && (
          <div>
            <h3 className="text-sm font-semibold mb-1">Notes</h3>
            <p className="text-sm">{data.notes}</p>
          </div>
        )}

        {/* TERMS */}
        {data.terms && (
          <div>
            <h3 className="text-sm font-semibold mb-1">Terms & Conditions</h3>
            <p className="text-sm whitespace-pre-line">{data.terms}</p>
          </div>
        )}

        {/* FOOTER */}
        <footer className="mt-auto text-center text-gray-600 text-sm pt-4">
          <p>Thank you for choosing Webli ⚡ Studio</p>
        </footer>

        <div className="ml-auto w-[40px] mt-4 drop-shadow">
          <img src="/logoIconTransparent.png" alt="icon" />
        </div>

      </div>
    </div>
  );
};

export default InvoicePreview;
