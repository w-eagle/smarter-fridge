import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { Calendar, CalendarHeader, EventList } from "../../dummy";
import { useSession, signOut } from "next-auth/react";
import { getCalendarEvents } from "@/actions/getCalendarEvents";

export const Clock = () => {
    const [currentTime, setCurrentTime] = useState(dayjs());
    const [expanded, expand] = useState(false);
    const [displayedCalDate, setDisplayedCalDate] = useState(dayjs());
    const [selectedCalendarDate, selectCalendarDate] = useState(dayjs());
    const { data: session, status } = useSession();
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [visibleCalendarEvents, setVisibleCalendarEvents] = useState();

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

    const popupCenter = (url, title) => {
        const dualScreenLeft = window.screenLeft ?? window.screenX;
        const dualScreenTop = window.screenTop ?? window.screenY;

        const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

        const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

        const systemZoom = width / window.screen.availWidth;

        const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
        const top = (height - 550) / 2 / systemZoom + dualScreenTop;

        const newWindow = window.open(
            url,
            title,
            `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`
        );

        newWindow?.focus();
    };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        if (status === "authenticated") {
            const getEvents = async () => {
                const res = await getCalendarEvents({ token: session.access_token, signal });
                console.log("res", session.access_token);
                setCalendarEvents(res.items);
                setVisibleCalendarEvents(
                    res?.items?.filter(
                        (e) =>
                            dayjs(e?.start?.dateTime).isSame(
                                selectedCalendarDate.format("YYYY-MM-DD"),
                                "day"
                            ) && e.status !== "cancelled"
                    )
                );
            };

            getEvents();
        }

        return () => abortController.abort();
    }, [session]);

    const onDateSelect = (date) => {
        selectCalendarDate(date);
        setVisibleCalendarEvents(
            calendarEvents?.filter(
                (e) =>
                    dayjs(e?.start?.dateTime).isSame(date.format("YYYY-MM-DD"), "day") &&
                    e.status !== "cancelled"
            )
        );
    };

    console.log(calendarEvents, visibleCalendarEvents, status);

    return (
        <div
            className={`${
                expanded ? "w-full h-full max-w-full max-h-full" : "w-[310px] h-[146px]"
            } widgetBackground overflow-hidden animated inline-block px-8 py-4 rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
            onClick={() => {
                expand((value) => !value);
            }}
        >
            <div className={`flex ${expanded ? "h-full" : "h-[126px]"} text-white animated`}>
                <div className={`${expanded ? "w-1/3" : "w-full"} animated h-full overflow-hidden`}>
                    <div className={`flex flex-col items-center animated`}>
                        <span className="text-[50px]">{currentTime.format("HH:mm")}</span>
                        <p className="text-3xl">{currentTime.format("ddd, DD MMMM")}</p>
                    </div>
                    <div
                        className={`${
                            expanded ? "opacity-1 animationDelay" : "opacity-0 overflow-hidden"
                        } max-w-[300px] mx-auto mt-[15px] animated`}
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
                            onDateSelect={(date) => onDateSelect(date)}
                            calendarEvents={calendarEvents}
                        />
                        {
                            status === "unauthenticated" ? (
                                <a
                                    className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    style={{ backgroundColor: "#ffffff", color: "gray" }}
                                    onClick={async () => {
                                        popupCenter("/google-signin", "Sample Sign In");
                                    }}
                                    role="button"
                                >
                                    Login
                                </a>
                            ) : null
                            // (
                            //     <a
                            //         className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                            //         style={{ backgroundColor: "#ffffff", color: "gray" }}
                            //         onClick={async () => {
                            //             signOut();
                            //         }}
                            //         role="button"
                            //     >
                            //         Logout
                            //     </a>
                            // )
                        }
                    </div>
                </div>
                <div
                    className={`${
                        expanded ? "w-2/3 pl-[20px]" : "w-0 overflow-hidden"
                    }  animated h-full`}
                >
                    <EventList
                        title={
                            selectedCalendarDate.isSame(dayjs().format("YYYY-MM-DD"), "day")
                                ? "Today"
                                : selectedCalendarDate.format("ddd DD MMM YYYY")
                        }
                        currentEvents={visibleCalendarEvents}
                    />
                </div>
            </div>
        </div>
    );
};
