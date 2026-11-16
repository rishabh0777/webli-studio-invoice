import React from "react";
import { formatINR } from "../utils/format";

const newItem = () => ({
  id:
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `item-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  title: "",
  details: "",
  amount: "",
});

const SectionLabel = ({ index, title }) => (
  <div className="flex items-center gap-3">
    <span className="font-mono text-[8.5px] tracking-[0.18em] text-neutral-400">
      {index}
    </span>
    <h2 className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink">
      {title}
    </h2>
    <span className="h-px flex-1 bg-line" />
  </div>
);

const SelectField = ({ children, ...props }) => (
  <div className="relative">
    <select className="field pr-8" {...props}>
      {children}
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-neutral-400">
      ▾
    </span>
  </div>
);

const InvoiceForm = ({ data, setData, computed }) => {
  const update = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const updateService = (id, field, value) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      ),
    }));
  };

  const addService = () => {
    setData((prev) => ({
      ...prev,
      services: [...prev.services, newItem()],
    }));
  };

  const removeService = (id) => {
    setData((prev) => {
      if (prev.services.length <= 1) return prev;
      return {
        ...prev,
        services: prev.services.filter((service) => service.id !== id),
      };
    });
  };

  return (
    <div className="editor-scroll flex h-full flex-col overflow-y-auto">
      <div className="px-6 pb-10 pt-6 lg:px-7">
        {/* Studio mark */}
        <div className="flex items-center justify-between border-b border-line pb-5">
          <div className="flex items-center gap-3">
            <img
              src="/logo/transparent.svg"
              alt="Webli Studio"
              className="h-9 w-9 object-contain"
            />
            <div>
              <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-neutral-500">
                Webli Studio
              </p>
              <h1 className="mt-0.5 text-[15px] font-medium tracking-[-0.01em] text-ink">
                Receipt Editor
              </h1>
            </div>
          </div>
          <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-neutral-400">
            A4 / IN
          </span>
        </div>

        {/* 01 — Header & receipt meta */}
        <section className="space-y-4 pt-6">
          <SectionLabel index="01" title="Receipt & Payment" />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label" htmlFor="receiptNumber">
                Receipt No.
              </label>
              <input
                id="receiptNumber"
                name="receiptNumber"
                className="field font-mono"
                placeholder="WS-2026-001"
                value={data.receiptNumber}
                onChange={update}
              />
            </div>
            <div>
              <label className="field-label" htmlFor="date">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="field font-mono"
                value={data.date}
                onChange={update}
              />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="paymentMode">
              Payment Mode
            </label>
            <SelectField
              id="paymentMode"
              name="paymentMode"
              value={data.paymentMode}
              onChange={update}
            >
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
            </SelectField>
          </div>

          <div>
            <label className="field-label" htmlFor="transactionId">
              Transaction / UTR ID
            </label>
            <input
              id="transactionId"
              name="transactionId"
              className="field font-mono"
              placeholder="UPI-632084910294"
              value={data.transactionId}
              onChange={update}
            />
          </div>
        </section>

        {/* 02 — Client details */}
        <section className="mt-7 space-y-4 border-t border-line pt-6">
          <SectionLabel index="02" title="Client Details" />

          <div>
            <label className="field-label" htmlFor="clientName">
              Client / Brand Name
            </label>
            <input
              id="clientName"
              name="clientName"
              className="field"
              placeholder="Swaad N Sip"
              value={data.clientName}
              onChange={update}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="field-label" htmlFor="contact">
                Contact
              </label>
              <input
                id="contact"
                name="contact"
                className="field font-mono"
                placeholder="+91 98765 43210"
                value={data.contact}
                onChange={update}
              />
            </div>
            <div>
              <label className="field-label" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                className="field"
                placeholder="Mumbai, India"
                value={data.location}
                onChange={update}
              />
            </div>
          </div>
        </section>

        {/* 03 — Line items */}
        <section className="mt-7 space-y-3 border-t border-line pt-6">
          <SectionLabel index="03" title="Line Items" />

          {data.services.map((service, index) => (
            <div
              key={service.id}
              className="border border-line bg-mist/70 p-3"
            >
              <div className="mb-2.5 flex items-center justify-between">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-neutral-500">
                  Item {String(index + 1).padStart(2, "0")}
                </span>
                {data.services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeService(service.id)}
                    className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-neutral-400 transition hover:text-ink"
                  >
                    Remove
                  </button>
                )}
              </div>

              <input
                className="field bg-paper"
                placeholder="Description"
                value={service.title}
                onChange={(e) =>
                  updateService(service.id, "title", e.target.value)
                }
              />

              <textarea
                rows={2}
                className="field mt-2 resize-none bg-paper leading-[1.5]"
                placeholder="Sub-details / scope"
                value={service.details}
                onChange={(e) =>
                  updateService(service.id, "details", e.target.value)
                }
              />

              <div className="mt-2 flex items-center gap-2 border border-line bg-paper px-3">
                <span className="font-mono text-[10px] text-neutral-400">₹</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  className="w-full appearance-none border-0 bg-transparent py-2 font-mono text-[12.5px] outline-none placeholder:text-neutral-400"
                  placeholder="Amount in INR"
                  value={service.amount}
                  onChange={(e) =>
                    updateService(service.id, "amount", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addService}
            className="flex w-full items-center justify-center gap-2 border border-dashed border-neutral-300 py-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500 transition hover:border-ink hover:text-ink"
          >
            <span className="text-[11px] leading-none">+</span> Add Line Item
          </button>
        </section>

        {/* 04 — Payment breakdown */}
        <section className="mt-7 space-y-3 border-t border-line pt-6">
          <SectionLabel index="04" title="Payment Type" />

          <div className="grid grid-cols-2 border border-line">
            {[
              ["full", "Full Payment"],
              ["advance", "Advance + Balance"],
            ].map(([value, label], index) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setData((prev) => ({ ...prev, paymentType: value }))
                }
                className={`px-2 py-2 font-mono text-[8.5px] uppercase tracking-[0.12em] transition ${
                  index === 1 ? "border-l border-line" : ""
                } ${
                  data.paymentType === value
                    ? "bg-ink text-white"
                    : "bg-paper text-neutral-500 hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {data.paymentType === "advance" && (
            <div className="border border-line bg-mist p-3">
              <label className="field-label" htmlFor="advancePaid">
                Advance Received (INR)
              </label>
              <input
                id="advancePaid"
                name="advancePaid"
                type="number"
                min="0"
                max={computed.subtotal}
                step="1"
                className="field bg-paper font-mono"
                placeholder="0"
                value={data.advancePaid}
                onChange={update}
              />
              <p className="mt-2 flex items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.12em] text-neutral-500">
                <span>Balance due</span>
                <span className="text-ink">{formatINR(computed.balanceDue)}</span>
              </p>
            </div>
          )}
        </section>

        {/* 05 — Footer note */}
        <section className="mt-7 space-y-3 border-t border-line pt-6">
          <SectionLabel index="05" title="Footer Note" />

          <textarea
            name="footerNote"
            rows={3}
            className="field resize-none leading-[1.6]"
            placeholder="Note shown above the receipt footer…"
            value={data.footerNote}
            onChange={update}
          />
        </section>
      </div>
    </div>
  );
};

export default InvoiceForm;
