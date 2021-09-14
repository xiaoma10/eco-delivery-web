export default function toIsoString(date) {
  const pad = function(num) {
      const norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
  }

  // eslint-disable-next-line prefer-template
  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds())
}