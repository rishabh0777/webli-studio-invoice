import React from "react";

const InvoiceDownload = ({ onPrint, onDownload }) => {
  return (
    <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
      <div className="flex items-center gap-2.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-neutral-500">
        <span className="h-1.5 w-1.5 bg-ink" />
        <span>Live A4 Preview</span>
        <span className="text-neutral-300">/</span>
        <span>210 × 297 mm</span>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={onDownload}
          className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-neutral-500 underline decoration-line underline-offset-4 transition hover:text-ink hover:decoration-ink"
        >
          Download PDF
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="flex items-center gap-3 bg-ink px-5 py-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white transition hover:bg-neutral-800 active:translate-y-px"
        >
          Print / Save PDF
          <svg
            className="h-2.5 w-5"
            viewBox="0 0 32 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden="true"
          >
            <line x1="0" y1="6" x2="29" y2="6" />
            <polyline points="25,2.5 29.5,6 25,9.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InvoiceDownload;
