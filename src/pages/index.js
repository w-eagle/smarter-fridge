"use client";

import { useState, useEffect, useRef } from "react";
import { BackgroundContainer, WidgetContainer } from "../components/partials/index";
import { ModalProvider } from "@/context/modalContext";

export default function HomePage() {
    const [forecast, setForecast] = useState(false);
    const [currentWeather, setCurrentWeather] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        (async () => {
            const weather = await fetch("/api/weather", { signal });

            if (!signal.aborted) {
                if (weather.ok) {
                    const json = await weather.json();
                    console.log(json);

                    setCurrentWeather(json);
                } else {
                    console.error(`HTTP error! Status: ${weather.status}`);
                    setCurrentWeather(false);
                }
            }
        })();

        return () => {
            abortController.abort();
        };
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        (async () => {
            const forecast = await fetch("/api/forecast", { signal });

            if (!signal.aborted) {
                if (forecast.ok) {
                    const json = await forecast.json();
                    console.log(json);

                    setForecast(json);
                } else {
                    console.error(`HTTP error! Status: ${forecast.status}`);
                    setForecast(false);
                }
            }
        })();

        return () => {
            abortController.abort();
        };
    }, []);

    const screenRef = useRef(null);

    return (
        <main ref={screenRef} className="w-[100vw] h-[100vh] relative">
            <ModalProvider>
                <BackgroundContainer currentWeather={currentWeather} forecast={forecast} />
                <WidgetContainer
                    currentWeather={currentWeather}
                    forecast={forecast}
                    screenRef={screenRef}
                />
            </ModalProvider>
        </main>
    );
}
