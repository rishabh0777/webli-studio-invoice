const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatINR = (value) => {
  const amount = Number(value) || 0;
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
};

export const formatReceiptDate = (iso) => {
  if (!iso) return "—";

  const parts = String(iso).split("-").map(Number);
  if (parts.length !== 3 || parts.some((part) => !part)) return iso;

  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return iso;

  return `${String(day).padStart(2, "0")} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};
