import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const TimersAndReminders = ({ timers }) => {
    const [displayedTimers, setDisplayedTimers] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = dayjs();
            const _timers = timers.map((timer) => {
                const timeLeft = timer.endTime.diff(now, "second");
                const hours = Math.floor(timeLeft / 3600);
                const minutes = Math.floor((timeLeft % 3600) / 60);
                const seconds = timeLeft % 60;
                return {
                    ...timer,
                    timeLeft: {
                        hours: hours.toString().padStart(2, "0"),
                        minutes: minutes.toString().padStart(2, "0"),
                        seconds: seconds.toString().padStart(2, "0")
                    }
                };
            });
            setDisplayedTimers(_timers);
        }, [1000]);

        return () => clearInterval(timer);
    }, [timers]);

    console.log("displayed timers", displayedTimers);

    return (
        <div
            className={`widgetBackground flex h-full w-full px-8 items-center rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className="flex text-white items-center">
                {displayedTimers.map((timer, index) => (
                    <button
                        key={`shortcut_${timer.name}_${index}`}
                        className="w-[80px] mx-[10px] text-center"
                    >
                        <p>{timer.name}</p>
                        <p>
                            {timer.timeLeft.hours}:{timer.timeLeft.minutes}:{timer.timeLeft.seconds}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};
