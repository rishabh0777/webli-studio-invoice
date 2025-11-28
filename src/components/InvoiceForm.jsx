import React from "react";

const InvoiceForm = ({ data, setData, computed }) => {

  const update = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const updateService = (i, field, value) => {
    setData((prev) => {
      const services = [...prev.services];
      services[i][field] = value;
      return { ...prev, services };
    });
  };

  const addService = () => {
    setData((prev) => ({
      ...prev,
      services: [...prev.services, { title: "", amount: "" }],
    }));
  };

  const onStatusChange = (e) => {
    const value = e.target.value;

    if (value === "paid") {
      setData((prev) => ({ ...prev, status: value, amountPaid: computed.total }));
    } else if (value === "unpaid") {
      setData((prev) => ({ ...prev, status: value, amountPaid: 0 }));
    } else {
      setData((prev) => ({ ...prev, status: value }));
    }
  };

  return (
    <div className="w-[350px] p-5 bg-white shadow-lg rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Invoice Form</h2>

      <input name="clientName" className="input" placeholder="Client Name" onChange={update} />
      <input name="brandName" className="input" placeholder="Brand Name" onChange={update} />
      <input name="clientEmail" className="input" placeholder="Client Email" onChange={update} />

      <input name="invoiceNumber" className="input" value={data.invoiceNumber} placeholder="Invoice Number" onChange={update} />
      <input name="date" type="date" className="input" onChange={update} />
      <input name="dueDate" type="date" className="input" onChange={update} />

      <h3 className="text-md font-semibold mt-4 mb-2">Services</h3>
      {data.services.map((s, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="input"
            placeholder="Title"
            value={s.title}
            onChange={(e) => updateService(i, "title", e.target.value)}
          />
          <input
            className="input"
            placeholder="Amount"
            value={s.amount}
            onChange={(e) => updateService(i, "amount", e.target.value)}
          />
        </div>
      ))}

      <button onClick={addService} className="w-full bg-black text-white py-2 rounded-lg mt-2">
        + Add Service
      </button>

      <input name="discount" className="input" placeholder="Discount (%)" value={data.discount} onChange={update} />

      <select className="input" value={data.status || ""} onChange={onStatusChange}>
        <option value="" disabled>Select Payment Status</option>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
        <option value="partial">Partially Paid</option>
      </select>

      {data.status === "partial" && (
        <input
          name="amountPaid"
          className="input"
          placeholder="Amount Paid (₹)"
          value={data.amountPaid}
          onChange={update}
        />
      )}

      <input name="upi" className="input" placeholder="UPI ID" value={data.upi} onChange={update} />

      <textarea name="notes" className="input h-20" placeholder="Notes" value={data.notes} onChange={update} />
      <textarea name="terms" className="input h-24" placeholder="Terms & Conditions" value={data.terms} onChange={update} />
    </div>
  );
};

export default InvoiceForm;
