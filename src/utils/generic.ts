export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
export const roundTo = (num: number, digits: number) => parseFloat(num.toFixed(digits));
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const getImageUrl = (path: string | null) => `https://image.tmdb.org/t/p/w500${path}`;
export const limitText = (text: string, limit: number) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + "...";
};