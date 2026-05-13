export const fmt = (n) => '$' + Math.round(n || 0).toLocaleString('en-US');
export const fmtMo = (n) => fmt(n) + '/mo';
export const fmtK = (n) => {
  if (Math.abs(n) >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (Math.abs(n) >= 1_000) return '$' + (n / 1_000).toFixed(0) + 'k';
  return fmt(n);
};
export const pct = (n, digits = 1) => (n * 100).toFixed(digits) + '%';
