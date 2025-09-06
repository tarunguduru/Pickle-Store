export const formatCurrency = (n, currency = "INR", locale = "en-IN") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(n || 0);
