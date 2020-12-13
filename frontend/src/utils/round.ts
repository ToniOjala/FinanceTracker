export const roundToDecimals = (value: number, decimals: number): number => {
  return Number(value.toFixed(decimals));
}