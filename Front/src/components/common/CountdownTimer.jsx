import React, { useState, useEffect } from 'react';
import { Clock, Play } from 'lucide-react';

export const CountdownTimer = ({ startDate, endDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now > end) return { status: "Completed" };
        if (now >= start && now <= end) return { status: "Active" };

        const difference = start - now;
        if (difference > 0) {
            return {
                status: "Upcoming",
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return { status: "Completed" };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [startDate, endDate]);

    if (timeLeft.status === "Completed") {
        return (
            <span className="px-2.5 py-1 text-xs font-semibold bg-white/10 text-gray-400 rounded-full">
                Ended
            </span>
        );
    }

    if (timeLeft.status === "Active") {
        return (
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 rounded-full animate-pulse">
                <Play size={10} fill="currentColor" /> Live
            </span>
        );
    }

    return (
        <div className="flex items-center gap-1.5 text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full text-xs font-mono font-medium">
            <Clock size={12} className="animate-spin-slow" />
            <span>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
        </div>
    );
};
