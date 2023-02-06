export function currencyEdit(val) {
  return new Intl.NumberFormat("mn-MN", {
    style: "currency",
    currency: "MNT",
    maximumFractionDigits: 2,
    roundingIncrement: 5,
  }).format(val);
}
export function formatNumber(val) {
  return new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(val);
}
