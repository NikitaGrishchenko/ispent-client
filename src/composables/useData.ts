import { DateTime } from 'luxon';

export function useData() {
  const optionsDateCalendar = (date: string) => {
    const today = DateTime.now().toFormat('yyyy/LL/dd');
    return date <= today;
  };
  const getTodayDateForCalendar = () => {
    return DateTime.now().toFormat('dd.LL.yyyy');
  };
  const fromISOToCalendarFormat = (inputDate: string) => {
    const date = DateTime.fromISO(inputDate);
    return `${date.toFormat('dd.LL.yyyy')}`;
  };

  return {
    optionsDateCalendar,
    getTodayDateForCalendar,
    fromISOToCalendarFormat,
  };
}
