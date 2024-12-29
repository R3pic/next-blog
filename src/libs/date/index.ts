import dayjs from 'dayjs';

export function formatDateString(date: Date) {
  return dayjs(date).format('YYYY-MM-DD');
}