import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

export interface CalendarProps {
  className?: string;
  selected?: Date | null;
  onSelect?: (date: Date | null) => void;
  showOutsideDays?: boolean;
  mode?: "single" | "range" | "multiple";
  initialFocus?: boolean;
}

function Calendar({
  className,
  selected,
  onSelect,
  mode = "single",
  initialFocus,
  ...props
}: CalendarProps) {
  return (
    <div className={cn("p-3", className)}>
      <DatePicker
        selected={selected}
        onChange={(date: Date | null) => onSelect?.(date)}
        inline
        isClearable
        className="!w-full"
        calendarClassName="!w-full custom-datepicker"
        wrapperClassName="!w-full"
        dateFormat="PPP"
        placeholderText="Select a date"
        popperClassName="!w-full"
        fixedHeight
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-2 py-2">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type="button"
              className="inline-flex p-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-sm font-semibold text-gray-900">
              {date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear()}
            </h2>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              className="inline-flex p-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
