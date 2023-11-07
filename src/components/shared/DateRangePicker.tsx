import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import { oneMonthAgo, today } from '../../utils/helpers';

interface IProps {
  className?: string;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  onChange: (dates: [Date | null, Date | null]) => void;
  onCalendarClose: () => void;
}
const DateRangePicker: FC<IProps> = ({
  className,
  endDate,
  onChange,
  startDate,
  onCalendarClose
}) => {
  return (
    <DatePicker
      className={`rounded-md min-w-fit outline-none dark:text-white text-sm sm:text-md bg-inherit ring-1 ring-gray-500 dark:placeholder:text-white placeholder:text-gray-700 p-1 sm:p-2 ${className}`}
      selected={startDate}
      onChange={onChange}
      clearButtonTitle="clear"
      startDate={startDate}
      endDate={endDate}
      maxDate={today}
      minDate={oneMonthAgo}
      onCalendarClose={onCalendarClose}
      selectsRange
      placeholderText="Filter by dates range"
      withPortal
      showIcon
      isClearable
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-gray-500  w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      }
    />
  );
};

export default DateRangePicker;
