import { useEffect, useState } from "react";
import styles from "./styles.module.css";

import dayjs from "dayjs";
import { Calendar, CalendarHeader } from "../../dummy";

export const Clock = () => {
    const [currentTime, setCurrentTime] = useState(dayjs());
    const [expanded, expand] = useState(false);
    const [displayedCalDate, setDisplayedCalDate] = useState(dayjs());
    const [selectedCalendarDate, selectCalendarDate] = useState(dayjs());

    useEffect(() => {
        const clock = setInterval(() => {
            setCurrentTime(dayjs());
        }, [5000]);

        return () => clearInterval(clock);
    }, []);

    useEffect(() => {
        const clockTimeout = setTimeout(() => {
            if (expanded) return expand(false);
        }, 1000 * 60);

        return () => clearTimeout(clockTimeout);
    }, [expanded]);

    return (
        <div
            className={`${
                expanded ? "w-full h-full" : "w-[297px] h-[106px]"
            } widgetBackground animated inline-block px-8 py-4 rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
            onClick={() => {
                expand((value) => !value);
            }}
        >
            <div
                className={`grid grid-cols-2 ${
                    expanded ? "grid-cols-[1fr_1fr] h-full w-full " : "grid-cols-[1fr_0]"
                } text-white animated`}
            >
                <div className="w-full h-full">
                    <div className={`text-center text-3xl`}>
                        <p>{currentTime.format("HH:mm")}</p>
                        <p>{currentTime.format("ddd, YY MMMM")}</p>
                    </div>
                    <div
                        className={`${
                            expanded ? "opacity-1 animationDelay" : "opacity-0"
                        } max-w-[300px] mx-auto mt-[30px]`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {expanded ? (
                            <>
                                <CalendarHeader
                                    handlePrev={() =>
                                        setDisplayedCalDate((date) => date.subtract(1, "month"))
                                    }
                                    handleNext={() =>
                                        setDisplayedCalDate((date) => date.add(1, "month"))
                                    }
                                    displayedDate={displayedCalDate.format("MMM - YYYY")}
                                />
                                <Calendar
                                    currentDate={dayjs()}
                                    displayedYear={displayedCalDate.year()}
                                    displayedMonth={displayedCalDate.month()}
                                    selectedStartDate={selectedCalendarDate}
                                    onDateSelect={(date) => selectCalendarDate(date)}
                                />
                            </>
                        ) : null}
                        {/* <iframe
                            src="https://calendar.google.com/calendar/embed?height=300&wkst=1&ctz=Europe%2FLondon&bgcolor=%23ffffff&showTitle=0&showPrint=0&showCalendars=0&showDate=0&showTabs=0&src=cHJ6ZW1la0BteWtpbmRvZmNydWlzZS5jb20&src=ZW4tZ2IudWsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%230B8043"
                            style={{ borderWidth: 0 }}
                            width="400"
                            height="300"
                            frameborder="0"
                        /> */}
                    </div>
                </div>
                <div className="w-full h-full animated"></div>
            </div>
        </div>
    );
};
