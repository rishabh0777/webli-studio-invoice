import React, { useEffect, useMemo, useRef, useState } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";
import InvoiceDownload from "../components/InvoiceDownload";
import { downloadPDF } from "../utils/pdf";
import { generateInvoiceNumber } from "../utils/invoiceNumber";

/* 210mm × 297mm at 96dpi */
const A4_WIDTH_PX = (210 / 25.4) * 96;
const A4_HEIGHT_PX = (297 / 25.4) * 96;

/* Reserve the next receipt number once per page load */
const INITIAL_RECEIPT_NUMBER = generateInvoiceNumber();

const newItem = () => ({
  id:
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `item-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  title: "",
  details: "",
  amount: "",
});

const InvoiceGenerator = () => {
  const [data, setData] = useState({
    clientName: "",
    contact: "",
    location: "",
    receiptNumber: INITIAL_RECEIPT_NUMBER,
    date: new Date().toISOString().slice(0, 10),
    paymentMode: "UPI",
    transactionId: "",
    paymentType: "full",
    advancePaid: "",
    footerNote:
      "Note: Advance/full payment is non-refundable once design and development work has commenced. For any queries, reach out at webli.studio",
    services: [newItem()],
  });

  const computed = useMemo(() => {
    const subtotal = +data.services
      .reduce((sum, item) => sum + Number(item.amount || 0), 0)
      .toFixed(2);

    const advance = Number(data.advancePaid) || 0;
    const totalPaid =
      data.paymentType === "advance"
        ? Math.min(Math.max(advance, 0), subtotal)
        : subtotal;

    const balanceDue = Math.max(+(subtotal - totalPaid).toFixed(2), 0);

    return { subtotal, totalPaid: +totalPaid.toFixed(2), balanceDue };
  }, [data.services, data.paymentType, data.advancePaid]);

  const viewportRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const measure = () => {
      const available = el.clientWidth - 8;
      setZoom(Math.min(1, Math.max(0.25, available / A4_WIDTH_PX)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-shell flex min-h-screen w-full flex-col bg-mist lg:flex-row">
      {/* Editor sidebar */}
      <aside className="no-print w-full border-b border-line bg-paper lg:sticky lg:top-0 lg:h-screen lg:w-[380px] lg:shrink-0 lg:border-b-0 lg:border-r xl:w-[420px]">
        <InvoiceForm data={data} setData={setData} computed={computed} />
      </aside>

      {/* Preview pane */}
      <section className="preview-pane flex min-w-0 flex-1 flex-col px-4 pb-16 pt-5 sm:px-8">
        <InvoiceDownload
          onPrint={() => window.print()}
          onDownload={() => downloadPDF(data.receiptNumber)}
        />

        <div
          ref={viewportRef}
          className="sheet-viewport flex flex-1 justify-center"
        >
          <div
            className="sheet-frame"
            style={{ width: A4_WIDTH_PX * zoom, height: A4_HEIGHT_PX * zoom }}
          >
            <div
              className="sheet-transform"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
              }}
            >
              <InvoicePreview data={data} computed={computed} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvoiceGenerator;
