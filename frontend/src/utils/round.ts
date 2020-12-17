export const roundToDecimals = (value: number, decimals: number): string => {
  if (!value) value = 0;
  return value.toFixed(decimals);
}