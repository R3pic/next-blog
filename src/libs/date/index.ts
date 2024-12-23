import dayjs from 'dayjs';

export function FormatDate(date: Date) {
  return dayjs(date).format('YYYY-MM-DD');
}