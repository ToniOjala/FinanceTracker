import { format, add, sub, isFirstDayOfMonth as isFDM, isLastDayOfMonth as isLDM, getDaysInMonth, formatDistanceToNowStrict, endOfMonth } from 'date-fns';

export function formatDate(date: Date, toFormat = 'yyyy-MM-dd'): string {
  return format(date, toFormat);
}

export function formatDateForDisplay(date: Date, display: string): string {
  return format(date, display);
}

export function getMonthAndYear(date: Date): string {
  return format(date, 'MMMM yyyy');
}

export function getMonth(date: Date): string {
  return format(date, 'MMMM');
}

export function getNotificationDate(date: Date): string {
  const distance = formatDistanceToNowStrict(date);
  const [value, word] = distance.split(' ');

  if(word !== 'days' && word !== 'months') return 'today';
  else if (word === 'days' && value === "1") return 'yesterday';
  else if (word === 'days' && value === "2") return '2 days ago';
  else if (word === 'days' && value === "3") return '3 days ago';
  else return formatDateForDisplay(date, 'dd.MM.yy');
}

export function getMonthName(month: number): string {
  switch (month) {
    case 0: return 'January';
    case 1: return 'February';
    case 2: return 'March';
    case 3: return 'April';
    case 4: return 'May';
    case 5: return 'June';
    case 6: return 'July';
    case 7: return 'August';
    case 8: return 'September';
    case 9: return 'October';
    case 10: return 'November';
    case 11: return 'December';
    default: throw new Error('Invalid month');
  }
}

export function getDateRows(monthIndex: number, year: number): number[] {
  const days = getDaysInMonth(new Date(year, monthIndex, 1));
  const rows: number[] = Array.from({ length: 42 }).map(() => 0);
  let startIndex = new Date(year, monthIndex, 1).getDay() - 1;
  if (startIndex < 0) startIndex = 7 + startIndex;

  let day = 1;
  for (let i = startIndex; i < 41; i++) {
    if (day > days) break;
    rows[i] = day;
    day++;
  }

  return rows;
}

export function getYear(date: Date): string {
  return format(date, 'yyyy');
}

export function getEndOfMonth(date: Date): Date {
  return endOfMonth(date);
}

export function isFirstDayOfMonth(date: Date): boolean {
  return isFDM(date);
}

export function isLastDayOfMonth(date: Date): boolean {
  return isLDM(date);
}

export function setMonth(date: Date, month: number): Date {
  return new Date(date.getFullYear(), month, date.getDate());
}

export function setYear(date: Date, year: number): Date {
  return new Date(year, date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number): Date {
  return add(date, { days });
}

export function removeDays(date: Date, days: number): Date {
  return sub(date, { days });
}

export function addMonths(date: Date, months: number): Date {
  return add(date, { months });
}

export function removeMonths(date: Date, months: number): Date {
  return sub(date, { months });
}

export function addYears(date: Date, years: number): Date {
  return add(date, { years });
}

export function removeYears(date: Date, years: number): Date {
  return sub(date, { years });
}