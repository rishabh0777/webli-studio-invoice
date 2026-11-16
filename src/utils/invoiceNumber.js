export const generateInvoiceNumber = () => {
  const year = new Date().getFullYear();
  let last = Number(localStorage.getItem("webli_invoice_last") || 0);
  last++;
  localStorage.setItem("webli_invoice_last", last);
  const padded = String(last).padStart(3, "0");
  return `WS-${year}-${padded}`;
};
