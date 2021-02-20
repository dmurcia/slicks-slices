const formatter = Intl.NumberFormat('es-CR', {
  style: 'currency',
  currency: 'CRC'
});

export default function formatMoney(cents) {
  return formatter.format(cents);
}