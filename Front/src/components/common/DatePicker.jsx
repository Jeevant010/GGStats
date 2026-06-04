import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

function isSameDay(d1, d2) {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

function formatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
}

const DatePicker = ({ selectedDate, onDateChange }) => {
    const today = useMemo(() => new Date(), []);
    const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());
    const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
    const [isOpen, setIsOpen] = useState(false);

    // Calculate allowed range: first day of last month → today
    const minDate = useMemo(() => {
        const d = new Date(today);
        d.setMonth(d.getMonth() - 1);
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        return d;
    }, [today]);

    const maxDate = useMemo(() => {
        const d = new Date(today);
        d.setHours(23, 59, 59, 999);
        return d;
    }, [today]);

    // Generate calendar grid
    const calendarDays = useMemo(() => {
        const firstDay = new Date(viewYear, viewMonth, 1);
        const lastDay = new Date(viewYear, viewMonth + 1, 0);
        const startPad = firstDay.getDay();
        const totalDays = lastDay.getDate();

        const days = [];

        // Padding from previous month
        const prevMonth = new Date(viewYear, viewMonth, 0);
        for (let i = startPad - 1; i >= 0; i--) {
            days.push({
                date: new Date(viewYear, viewMonth - 1, prevMonth.getDate() - i),
                isCurrentMonth: false,
            });
        }

        // Current month days
        for (let d = 1; d <= totalDays; d++) {
            days.push({
                date: new Date(viewYear, viewMonth, d),
                isCurrentMonth: true,
            });
        }

        // Padding for next month
        const remaining = 42 - days.length;
        for (let d = 1; d <= remaining; d++) {
            days.push({
                date: new Date(viewYear, viewMonth + 1, d),
                isCurrentMonth: false,
            });
        }

        return days;
    }, [viewMonth, viewYear]);

    const canGoPrev = useMemo(() => {
        const prevMonth = new Date(viewYear, viewMonth - 1, 1);
        return prevMonth >= new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    }, [viewYear, viewMonth, minDate]);

    const canGoNext = useMemo(() => {
        const nextMonth = new Date(viewYear, viewMonth + 1, 1);
        return nextMonth <= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
    }, [viewYear, viewMonth, maxDate]);

    const goToPrevMonth = () => {
        if (!canGoPrev) return;
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(viewYear - 1);
        } else {
            setViewMonth(viewMonth - 1);
        }
    };

    const goToNextMonth = () => {
        if (!canGoNext) return;
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(viewYear + 1);
        } else {
            setViewMonth(viewMonth + 1);
        }
    };

    const selectDate = (date) => {
        if (date < minDate || date > maxDate) return;
        onDateChange(date);
        setIsOpen(false);
    };

    const goToToday = () => {
        const now = new Date();
        setViewMonth(now.getMonth());
        setViewYear(now.getFullYear());
        onDateChange(now);
        setIsOpen(false);
    };

    // Quick date navigation
    const goToPrevDay = () => {
        const prev = new Date(selectedDate);
        prev.setDate(prev.getDate() - 1);
        if (prev >= minDate) {
            onDateChange(prev);
            setViewMonth(prev.getMonth());
            setViewYear(prev.getFullYear());
        }
    };

    const goToNextDay = () => {
        const next = new Date(selectedDate);
        next.setDate(next.getDate() + 1);
        if (next <= maxDate) {
            onDateChange(next);
            setViewMonth(next.getMonth());
            setViewYear(next.getFullYear());
        }
    };

    const isToday = isSameDay(selectedDate, today);

    const formattedDate = selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="relative">
            {/* Date Navigation Bar */}
            <div className="flex items-center gap-2">
                {/* Prev Day */}
                <button
                    onClick={goToPrevDay}
                    disabled={selectedDate <= minDate}
                    className="p-1.5 rounded-lg bg-surface-700 hover:bg-surface-600 text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Date Display / Calendar Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium
            ${isOpen
                            ? 'bg-accent-muted text-accent border border-accent/30'
                            : 'bg-surface-700 hover:bg-surface-600 text-gray-300 hover:text-white border border-transparent'
                        }
          `}
                >
                    <Calendar size={14} />
                    <span>{isToday ? 'Today' : formattedDate}</span>
                </button>

                {/* Next Day */}
                <button
                    onClick={goToNextDay}
                    disabled={isSameDay(selectedDate, today)}
                    className="p-1.5 rounded-lg bg-surface-700 hover:bg-surface-600 text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={16} />
                </button>

                {/* Today Button */}
                {!isToday && (
                    <button
                        onClick={goToToday}
                        className="text-xs text-accent hover:text-accent-hover font-medium ml-1 transition-colors"
                    >
                        Today
                    </button>
                )}
            </div>

            {/* Calendar Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                    <div className="absolute top-full left-0 mt-2 z-50 calendar-dropdown glass rounded-xl p-4 w-[300px] shadow-2xl border border-surface-500/30">
                        {/* Month/Year Header */}
                        <div className="flex items-center justify-between mb-3">
                            <button
                                onClick={goToPrevMonth}
                                disabled={!canGoPrev}
                                className="p-1 rounded-md hover:bg-surface-600 text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="text-sm font-semibold text-white">
                                {MONTHS[viewMonth]} {viewYear}
                            </span>
                            <button
                                onClick={goToNextMonth}
                                disabled={!canGoNext}
                                className="p-1 rounded-md hover:bg-surface-600 text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-1">
                            {DAYS.map((day) => (
                                <div key={day} className="text-center text-[10px] font-medium text-gray-500 py-1">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map(({ date, isCurrentMonth }, idx) => {
                                const isSelected = isSameDay(date, selectedDate);
                                const isTodayDate = isSameDay(date, today);
                                const isDisabled = date < minDate || date > maxDate;

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => !isDisabled && selectDate(date)}
                                        disabled={isDisabled}
                                        className={`
                      w-9 h-9 rounded-lg text-xs font-medium transition-all flex items-center justify-center
                      ${!isCurrentMonth ? 'text-gray-700' : ''}
                      ${isDisabled ? 'text-gray-700 cursor-not-allowed' : 'hover:bg-surface-600 cursor-pointer'}
                      ${isCurrentMonth && !isDisabled && !isSelected ? 'text-gray-300' : ''}
                      ${isSelected ? 'bg-accent text-white font-bold' : ''}
                      ${isTodayDate && !isSelected ? 'ring-1 ring-accent/50 text-accent' : ''}
                    `}
                                    >
                                        {date.getDate()}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-3 pt-3 border-t border-surface-600/50 flex items-center justify-between">
                            <button
                                onClick={goToToday}
                                className="text-[11px] text-accent hover:text-accent-hover font-medium transition-colors"
                            >
                                Go to Today
                            </button>
                            <span className="text-[10px] text-gray-600">
                                Last 2 months available
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export { formatDateKey };
export default DatePicker;
