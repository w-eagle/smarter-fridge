import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { Calendar, CalendarHeader, EventList } from "../../dummy";

export const Clock = () => {
    const [currentTime, setCurrentTime] = useState(dayjs());
    const [expanded, expand] = useState(false);
    const [displayedCalDate, setDisplayedCalDate] = useState(dayjs());
    const [selectedCalendarDate, selectCalendarDate] = useState(dayjs());

    useEffect(() => {
        const clock = setInterval(() => {
            setCurrentTime(dayjs());
        }, 5000);

        return () => clearInterval(clock);
    }, []);

    useEffect(() => {
        const clockTimeout = setTimeout(() => {
            if (expanded) return expand(false);
        }, 1000 * 60 * 2);

        return () => clearTimeout(clockTimeout);
    }, [expanded]);

    return (
        <div
            className={`${
                expanded ? "w-full h-full" : "w-[297px] h-[126px]"
            } widgetBackground animated inline-block px-8 py-4 rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
            onClick={() => {
                expand((value) => !value);
            }}
        >
            <div className={`flex ${expanded ? "h-full" : "h-[126px]"} text-white animated`}>
                <div className={`${expanded ? "w-1/3" : "w-full"} animated h-full overflow-hidden`}>
                    <div className={`flex flex-col items-center animated`}>
                        <span className="text-[40px]">{currentTime.format("HH:mm")}</span>
                        <p className="text-2xl">{currentTime.format("ddd, DD MMMM")}</p>
                    </div>
                    <div
                        className={`${
                            expanded ? "opacity-1 animationDelay" : "opacity-0 overflow-hidden"
                        } max-w-[300px] mx-auto mt-[30px] animated`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CalendarHeader
                            handlePrev={() =>
                                setDisplayedCalDate((date) => date.subtract(1, "month"))
                            }
                            handleNext={() => setDisplayedCalDate((date) => date.add(1, "month"))}
                            displayedDate={displayedCalDate.format("MMM - YYYY")}
                        />
                        <Calendar
                            currentDate={dayjs()}
                            displayedYear={displayedCalDate.year()}
                            displayedMonth={displayedCalDate.month()}
                            selectedStartDate={selectedCalendarDate}
                            onDateSelect={(date) => selectCalendarDate(date)}
                        />
                    </div>
                </div>
                <div
                    className={`${
                        expanded ? "w-2/3 pl-[20px]" : "w-0 overflow-hidden"
                    }  animated h-full`}
                >
                    <EventList title={"today"} currentEvents={[]} />
                </div>
            </div>
        </div>
    );
};
