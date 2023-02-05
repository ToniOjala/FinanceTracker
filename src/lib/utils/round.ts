export const roundToDecimals = (value: number, decimals: number): string => {
  if (!value || typeof value !== 'number') value = 0;
  return value.toFixed(decimals);
}

export const roundToDecimalsAsNumber = (value: number, decimals: number): number => {
  if (!value || typeof value !== 'number') value = 0;
  return Number(value.toFixed(decimals));
}