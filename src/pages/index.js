import { useState, useEffect, useRef } from "react";
import { BackgroundContainer, WidgetContainer } from "../components/partials/index";
import { ModalProvider } from "@/context/modalContext";
import { getCurrentWeather } from "@/actions/getCurrentWeather";
import { getForecast } from "@/actions/getForecast";
import dayjs from "dayjs";
import { getCalendarEvents } from "@/actions/getCalendarEvents";

export default function HomePage() {
    const [forecast, setForecast] = useState(false);
    const [currentWeather, setCurrentWeather] = useState(false);
    const [calendarEvents, setCalendarEvents] = useState(false);
    const [fetchCurrentWeather, setFetchCurrentWeather] = useState(true);
    const [fetchForecast, setFetchForecast] = useState(true);
    const [fetchCalendarEvents, setFetchCalendarEvents] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        (async () => {
            if (fetchCurrentWeather || !currentWeather) {
                console.warn("fetching current weather", dayjs().format("HH:mm DD/MM/YYYY"));
                const weather = await getCurrentWeather({ signal });

                if (weather?.error) {
                    setFetchCurrentWeather(false);
                    localStorage.setItem(
                        "nextCurrentWeatherFetch",
                        dayjs().add(2, "minute").startOf("minute")
                    );

                    return setError(
                        `${dayjs().format(
                            "HH:MM"
                        )}: Failed to fetch weather \nNext attempt: ${dayjs()
                            .add(2, "minute")
                            .startOf("minute")}`
                    );
                }

                if (weather) {
                    setError(false);
                    localStorage.setItem(
                        "nextCurrentWeatherFetch",
                        dayjs().add(1, "hour").startOf("hour")
                    );
                    setCurrentWeather(weather);
                    setFetchCurrentWeather(false);
                } else {
                    setCurrentWeather(false);
                }
            }
        })();

        return () => {
            abortController.abort();
        };
    }, [fetchCurrentWeather]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        (async () => {
            if (fetchForecast || !forecast) {
                console.warn("fetching new forecast");
                const _forecast = await getForecast({ signal });

                if (_forecast?.error) {
                    setFetchForecast(false);
                    localStorage.setItem(
                        "nextForecastFetch",
                        dayjs().add(2, "minute").startOf("minute")
                    );
                    return setError(
                        `${dayjs().format(
                            "HH:MM"
                        )}: Failed to fetch forecast \nNext attempt: ${dayjs()
                            .add(2, "minute")
                            .startOf("minute")}`
                    );
                }

                if (_forecast) {
                    setError(false);
                    localStorage.setItem(
                        "nextForecastFetch",
                        dayjs().add(1, "hour").startOf("hour")
                    );
                    setForecast(_forecast);
                    setFetchForecast(false);
                } else {
                    setForecast(false);
                }
            }
        })();

        return () => {
            abortController.abort();
        };
    }, [fetchForecast]);

    // useEffect(() => {
    //     const abortController = new AbortController();
    //     const signal = abortController.signal;

    //     (async () => {
    //         if (fetchCalendarEvents || !calendarEvents) {
    //             console.warn("fetching calendar events");
    //             const events = await getCalendarEvents({ signal });

    //             if (events?.error) {
    //                 setFetchCalendarEvents(false);
    //                 localStorage.setItem(
    //                     "nextCalendarEventsFetch",
    //                     dayjs().add(2, "minute").startOf("minute")
    //                 );
    //                 return setError(
    //                     `${dayjs().format(
    //                         "HH:MM"
    //                     )}: Failed to fetch calendar events \nNext attempt: ${dayjs()
    //                         .add(2, "minute")
    //                         .startOf("minute")}`
    //                 );
    //             }

    //             if (events) {
    //                 setError(false);
    //                 localStorage.setItem(
    //                     "nextCalendarEventsFetch",
    //                     dayjs().add(1, "hour").startOf("hour")
    //                 );
    //                 setCalendarEvents(events);
    //                 setFetchCalendarEvents(false);
    //             } else {
    //                 setCalendarEvents(false);
    //             }
    //         }
    //     })();

    //     return () => {
    //         abortController.abort();
    //     };
    // }, [fetchCalendarEvents]);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextCurrentWeatherFetchDate = localStorage.getItem("nextCurrentWeatherFetch");
            const nextForecastFetchDate = localStorage.getItem("nextForecastFetch");
            const nextCalendarEventsFetch = localStorage.getItem("nextCalendarEventsFetch");

            if (
                !nextCurrentWeatherFetchDate ||
                dayjs().isAfter(dayjs(nextCurrentWeatherFetchDate))
            ) {
                setFetchCurrentWeather(true);
            }
            if (!nextForecastFetchDate || dayjs().isAfter(dayjs(nextForecastFetchDate))) {
                setFetchForecast(true);
            }
            // if (!nextCalendarEventsFetch || dayjs().isAfter(dayjs(nextCalendarEventsFetch))) {
            //     setFetchCalendarEvents(true);
            // }
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const screenRef = useRef(null);

    return (
        <main ref={screenRef} className="w-[100vw] h-[100vh] relative">
            {!currentWeather || !forecast ? null : (
                <ModalProvider>
                    <BackgroundContainer currentWeather={currentWeather} forecast={forecast} />
                    <WidgetContainer
                        currentWeather={currentWeather}
                        forecast={forecast}
                        screenRef={screenRef}
                        calendarEvents={calendarEvents}
                    />
                </ModalProvider>
            )}
            {error ? (
                <div className="absolute top-0 left-20 text-white widgetDarkBackground text-center backdrop-blur-sm rounded-lg w-1/2 h-[120px] px-8 py-4">
                    <p className="w-full text-center">{error}</p>
                    <button
                        onClick={() => {
                            setError(false);
                        }}
                        className="bg-green-600 rounded-lg px-4 py-1 mt-[20px]"
                    >
                        OK
                    </button>
                </div>
            ) : null}
        </main>
    );
}
