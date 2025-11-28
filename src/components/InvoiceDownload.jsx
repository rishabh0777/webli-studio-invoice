import React from "react";

const InvoiceDownload = ({ onDownload }) => {
  return (
    <button
      onClick={onDownload}
      className="px-5 py-3 bg-black text-white rounded-lg mt-4"
    >
      Download Invoice (PDF)
    </button>
  );
};

export default InvoiceDownload;
