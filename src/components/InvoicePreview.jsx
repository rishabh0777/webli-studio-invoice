import React from "react";
import { formatINR, formatReceiptDate } from "../utils/format";

const Arrow = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 32 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    aria-hidden="true"
  >
    <line x1="0" y1="6" x2="29" y2="6" />
    <polyline points="25,2.5 29.5,6 25,9.5" />
  </svg>
);

const InvoicePreview = ({ data, computed }) => {
  const { subtotal, totalPaid, balanceDue } = computed;
  const isAdvance = data.paymentType === "advance";
  const pill = data.receiptNumber
    ? `Receipt #${data.receiptNumber}`
    : data.clientName
      ? `To ${data.clientName}`
      : "Receipt";

  return (
    <article id="invoice" className="a4-sheet">
      {/* Centered watermark */}
      <img
        src="/logo/transparent.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto w-[65%] select-none opacity-[0.035]"
      />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-start justify-between gap-6 border-b border-ink pb-6">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo/transparent.svg"
              alt="Webli Studio"
              className="h-11 w-11 object-contain"
            />
            <div className="text-[15px] font-semibold uppercase leading-[1.1] tracking-[0.18em] text-ink">
              <div>Webli</div>
              <div>Studio</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-full bg-ink px-5 py-2.5 text-white">
            <Arrow className="h-2.5 w-6 shrink-0" />
            <span className="font-mono text-[10px] tracking-[0.06em]">
              {pill}
            </span>
          </div>
        </header>

        {/* Title block */}
        <section className="pt-9">
          <p className="font-serif text-[26px] italic leading-none text-ink">
            Payment
          </p>
          <h2 className="mt-2 text-[40px] font-bold uppercase leading-none tracking-[0.22em] text-ink">
            Receipt
          </h2>
          <p className="mt-5 max-w-[430px] font-serif text-[12.5px] leading-[1.7] text-neutral-600">
            <span className="block">
              Thank you for partnering with Webli Studio. This document
              confirms the receipt of your payment
            </span>
            <span className="block">
              for the design & development services itemized below.
            </span>
          </p>
        </section>

        {/* Metadata grid */}
        <section className="mt-8 grid grid-cols-2 border-y border-ink">
          <div className="border-r border-line py-5 pr-6">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-neutral-500">
              Billed To
            </p>
            <p className="mt-2.5 text-[14px] font-semibold uppercase tracking-[0.04em] text-ink">
              {data.clientName || "Client Name"}
            </p>
            {data.contact && (
              <p className="mt-1.5 font-mono text-[10.5px] leading-relaxed text-neutral-600">
                {data.contact}
              </p>
            )}
            <p className="font-sans text-[11px] leading-relaxed text-neutral-600">
              {data.location || "India"}
            </p>
          </div>

          <div className="py-5 pl-6">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-neutral-500">
              Receipt Details
            </p>
            <dl className="mt-2.5 space-y-1.5 text-[11px]">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-neutral-500">Receipt No.</dt>
                <dd className="font-mono text-[10.5px] text-ink">
                  {data.receiptNumber || "—"}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-neutral-500">Date Issued</dt>
                <dd className="font-mono text-[10.5px] text-ink">
                  {formatReceiptDate(data.date)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-neutral-500">Payment Mode</dt>
                <dd className="font-medium text-ink">
                  {data.paymentMode || "—"}
                </dd>
              </div>
              {data.transactionId && (
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-neutral-500">Transaction ID</dt>
                  <dd className="break-all text-right font-mono text-[10px] text-ink">
                    {data.transactionId}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </section>

        {/* Itemized table */}
        <section className="mt-8">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-mist font-mono text-[8.5px] uppercase tracking-[0.18em] text-neutral-600">
                <th className="w-[34%] px-3 py-2.5 font-medium">Description</th>
                <th className="w-[46%] px-3 py-2.5 font-medium">Details</th>
                <th className="w-[20%] px-3 py-2.5 text-right font-medium">
                  Amount (INR)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.services.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-line align-top"
                >
                  <td className="px-3 py-3.5 text-[12px] font-medium leading-snug text-ink">
                    {service.title || (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3.5 text-[10.5px] leading-[1.55] text-neutral-500">
                    {service.details || "—"}
                  </td>
                  <td className="px-3 py-3.5 text-right font-mono text-[11px] text-ink">
                    {formatINR(service.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Totals */}
        <section className="mt-7 flex justify-end">
          <div className="w-[300px]">
            <div className="divide-y divide-white bg-mist">
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-neutral-500">
                  Subtotal
                </span>
                <span className="font-mono text-[11px] text-ink">
                  {formatINR(subtotal)}
                </span>
              </div>

              {isAdvance && (
                <div className="flex items-center justify-between px-4 py-2.5">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-neutral-500">
                    Balance Due
                  </span>
                  <span className="font-mono text-[11px] text-ink">
                    {formatINR(balanceDue)}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-baseline justify-between border-t border-ink pt-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ink">
                  Total Paid
                </span>
                <span className="bg-ink px-1.5 py-0.5 font-mono text-[7.5px] uppercase tracking-[0.16em] text-white">
                  Paid
                </span>
              </div>
              <span className="font-mono text-[17px] font-semibold tracking-tight text-ink">
                {formatINR(totalPaid)}
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto pt-10">
          {data.footerNote && (
            <p className="max-w-[470px] text-[9.5px] leading-[1.7] text-neutral-500">
              {data.footerNote}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-ink pt-3 font-mono text-[8.5px] uppercase tracking-[0.16em]">
            <span className="text-neutral-500">Webli Studio / 2026</span>
            <span className="flex items-center gap-1.5 font-semibold text-ink">
              India <span className="text-[10px] leading-none">↗</span>
            </span>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default InvoicePreview;
