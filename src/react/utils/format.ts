export const formatDate = (date: string): string => {
  if (!date) return '';
  const splitDate = date.split('-');
  const year = splitDate[0];
  const month = splitDate[1];
  const day = splitDate[2].substr(0, 2);

  return `${day}.${month}.${year}`;
}