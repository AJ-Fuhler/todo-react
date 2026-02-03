import {
  DAY_PLACEHOLDER,
  MONTH_PLACEHOLDER,
  YEAR_PLACEHOLDER,
  DAY_OPTIONS,
  MONTH_OPTIONS,
  YEAR_OPTIONS,
} from '../constants/dateOptions';

export interface DateSelectProps {
  day: string;
  month: string;
  year: string;
  onDayChange: (day: string) => void;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
}

export function DateSelect({
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
}: DateSelectProps) {
  const dayOptions =
    month === '02'
      ? DAY_OPTIONS.slice(0, 28)
      : DAY_OPTIONS;

  return (
    <div className="date-selects">
      <select value={day} onChange={(e) => onDayChange(e.target.value)}>
        <option value={DAY_PLACEHOLDER}>Day</option>
        {dayOptions.map((d) => (
          <option key={d} value={d}>
            {parseInt(d, 10)}
          </option>
        ))}
      </select>
      /
      <select value={month} onChange={(e) => onMonthChange(e.target.value)}>
        <option value={MONTH_PLACEHOLDER}>Month</option>
        {MONTH_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      /
      <select value={year} onChange={(e) => onYearChange(e.target.value)}>
        <option value={YEAR_PLACEHOLDER}>Year</option>
        {YEAR_OPTIONS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
