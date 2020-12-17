/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
export const parseString = (text: any, property: string): string => {
  if (!text || !(typeof text === 'string'))
    throw new Error(`Incorrect or missing ${property}: ${text}`);

  return text;
};

export const parseNumber = (num: any, property: string): number => {
  if (num === null || num === undefined || typeof num !== 'number') 
    throw new Error(`Incorrect or missing ${property}: ${num}`);

  return num;
};

export const parseDate = (date: any, property: string): Date => {
  try {
    if (!date || !(typeof date === 'string')) 
      throw new Error(`Incorrect or missing ${property}: ${date}`);
    const parsedDate = new Date(date);
    return parsedDate;
  } catch {
    throw new Error(`Incorrect or missing ${property}: ${date}`);
  }
};

export function parseValue<T>(value: any, type: string, property: string): T {
  if (value === null || value === undefined || typeof value === type)
    throw new Error(`Incorrect or missing ${property}: ${property}`);

  return value as T;
}