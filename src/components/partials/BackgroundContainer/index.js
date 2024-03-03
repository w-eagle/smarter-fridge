"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./styles.module.css";
import rain from "./rain.module.css";
import stars from "./stars.module.scss";
import houseDay from "../../../../public/house_day_full_hd.png";
import housenight from "../../../../public/house_night_2_full_hd.png";
import houseBlack from "../../../../public/house_black_full_hd.png";
import cloud1 from "../../../../public/cloud1.png";
import cloud2 from "../../../../public/cloud2.png";
import cloud3 from "../../../../public/cloud3.png";
import cloud4 from "../../../../public/cloud4.png";
import cloud5 from "../../../../public/cloud5.png";
import cloud6 from "../../../../public/cloud6.png";
import cloud7 from "../../../../public/cloud7.png";
import cloud8 from "../../../../public/cloud8.png";
import cloud9 from "../../../../public/cloud9.png";

const getAstroInfo = (forecast) => {
    const today = dayjs().format("YYYY-MM-DD");
    const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

    const todaysAstro = forecast.forecast.forecastday.find((day) => day.date === today);
    const tomorrowsAstro = forecast.forecast.forecastday.find((day) => day.date === tomorrow);

    const sunrise = dayjs(`${todaysAstro.date} ${todaysAstro.astro.sunrise}`);
    const sunset = dayjs(`${todaysAstro.date} ${todaysAstro.astro.sunset}`);

    const sunTimeOnSky = sunset.diff(sunrise) / 1000;

    const moonrise = dayjs(`${todaysAstro.date} ${todaysAstro.astro.moonrise}`);
    const moonset = dayjs(`${todaysAstro.date} ${tomorrowsAstro.astro.moonset}`);

    const moonTimeOnSky = moonrise.diff(moonset) / 1000;

    const sunriseLength = (sunTimeOnSky / 100) * 5;

    return {
        sunrise: todaysAstro.astro.sunrise,
        sunset: todaysAstro.astro.sunset,
        sunTimeOnSkyInSeconds: `${sunTimeOnSky}s`,
        moonrise: todaysAstro.astro.moonrise,
        moonset: tomorrowsAstro.astro.moonset,
        moonTimeOnSkyInSeconds: `${moonTimeOnSky}s`,
        sunriseLength: sunriseLength
    };
};

export const BackgroundContainer = ({ currentWeather, forecast }) => {
    if (!currentWeather || !forecast) {
        return null;
    }
    const [isDay, setDay] = useState(false);
    const [isMoonVisible, showMoon] = useState(false);
    const [astroInfo, setAstroInfo] = useState(getAstroInfo(forecast));
    const [weatherConditions, setWeatherConditions] = useState();
    const [shouldShowSunrise, setShowingSunrise] = useState(false);

    useEffect(() => {
        setAstroInfo(getAstroInfo(forecast));
    }, [forecast]);

    useEffect(() => {
        setWeatherConditions(currentWeather);
    }, [currentWeather]);

    useEffect(() => {
        const int = setInterval(() => {
            const today = dayjs().format("YYYY-MM-DD");

            const todaysAstro = forecast.forecast.forecastday.find((day) => day.date === today);

            const sunrise = dayjs(`${todaysAstro.date} ${todaysAstro.astro.sunrise}`);
            const sunset = dayjs(`${todaysAstro.date} ${todaysAstro.astro.sunset}`);
            const moonrise = dayjs(`${todaysAstro.date} ${todaysAstro.astro.moonrise}`);
            const moonset = dayjs(`${todaysAstro.date} ${todaysAstro.astro.moonset}`);

            const now = dayjs();

            if (
                (!shouldShowSunrise &&
                    now.hour() === sunrise.hour() &&
                    now.minute() === sunrise.minute()) ||
                (now.hour() === sunset.hour() && now.minute() === sunset.minute())
            ) {
                setShowingSunrise(true);
            }

            if (!isMoonVisible && now.isAfter(moonrise) && now.isBefore(moonset)) {
                showMoon(true);
            }

            if (isMoonVisible && now.isBefore(moonrise) && now.isAfter(moonset)) {
                showMoon(false);
            }

            if (
                isMoonVisible &&
                now.hour() <= moonrise.hour() &&
                now.minute() <= moonrise.minute() &&
                now.hour() < moonset.hour() &&
                now.minute() < moonset.minute()
            ) {
                showMoon(true);
            }

            if (now.isAfter(sunrise) && now.isBefore(sunset) && !isDay) {
                return setDay(true);
            } else if (now.isBefore(sunrise) && isDay) {
                return setDay(false);
            } else if (now.isAfter(sunset) && isDay) {
                return setDay(false);
            }
        }, [1000 * 60]);

        return () => clearInterval(int);
    }, []);

    useEffect(() => {
        if (shouldShowSunrise && astroInfo?.sunriseLength) {
            setTimeout(() => setShowingSunrise(false), [astroInfo.sunriseLength * 1000]);
        }
    }, [shouldShowSunrise]);

    return !astroInfo || !weatherConditions ? null : (
        <div className={styles.container}>
            <div
                style={{ transitionDuration: `${astroInfo.sunriseLength}s` }}
                className={`${
                    !isDay ? styles.containerNight : styles.containerDay
                } h-[100vh] w-[100vw]`}
            >
                <img
                    style={{ transitionDuration: `${astroInfo.sunriseLength}s` }}
                    className={`${
                        isDay ? styles.visible : styles.invisible
                    } w-full h-full absolute top-0 left-0 z-[70]`}
                    src={houseDay.src}
                />
                <img
                    style={{ transitionDuration: `${astroInfo.sunriseLength}s` }}
                    className={`${
                        !isDay ? styles.visible : styles.invisible
                    } w-full h-full absolute top-0 left-0 z-[70]`}
                    src={housenight.src}
                />
                <img
                    className={`w-full h-full absolute top-0 left-0 z-[60]`}
                    src={houseBlack.src}
                />
            </div>
            <div
                style={{ animationDuration: `${astroInfo.sunriseLength}s` }}
                className={`${styles.containerSunshine} ${
                    shouldShowSunrise ? styles.rise : styles.invisible
                }`}
            ></div>
            <div
                style={{
                    animationDuration: astroInfo.sunTimeOnSkyInSeconds
                }}
                className={`${isDay ? styles.sun : styles.invisible}`}
            ></div>
            <div
                style={{ animationDuration: astroInfo.moonTimeOnSkyInSeconds }}
                className={`${isMoonVisible ? styles.moon : styles.invisible}`}
            ></div>
            <div
                style={{ transitionDuration: `${astroInfo.sunriseLength}s` }}
                className={`${stars.starsConatiner} ${!isDay ? styles.visible : styles.invisible}`}
            >
                <div className={stars.mainContainer}>
                    <div className={stars.subContainer}>
                        <div className={stars.sky}>
                            <div className={stars.stars}></div>
                            <div className={stars.stars2}></div>
                            <div className={stars.stars2}></div>
                            <div className={stars.comet}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="z-[50] absolute top-0 left-0 w-full h-[200px]">
                <div className="w-full h-full relative">
                    {weatherConditions.current.condition.text.toLowerCase() === "cloudy" ||
                    weatherConditions.current.condition.text.toLowerCase() === "overcast" ||
                    weatherConditions.current.condition.text.toLowerCase() === "partly cloudy" ? (
                        <>
                            <img className="absolute top-12 left-[85%]" src={cloud5.src} />
                            <img className="absolute top-10 left-[15%]" src={cloud3.src} />
                            <img className="absolute top-10 left-[42%]" src={cloud2.src} />
                        </>
                    ) : null}

                    {weatherConditions.current.condition.text.toLowerCase() === "cloudy" ||
                    weatherConditions.current.condition.text.toLowerCase() === "overcast" ? (
                        <>
                            <img className="absolute top-24 left-[23%]" src={cloud6.src} />
                            <img className="absolute top-20 left-[75%]" src={cloud8.src} />
                            <img className="absolute top-2 left-[32%]" src={cloud9.src} />
                        </>
                    ) : null}

                    {weatherConditions.current.condition.text.toLowerCase() === "overcast" ? (
                        <>
                            <img className="absolute top-4 left-[65%]" src={cloud4.src} />
                            <img className="absolute top-4 left-[53%]" src={cloud7.src} />
                            <img className="absolute top-4 left-0" src={cloud1.src} />
                        </>
                    ) : null}
                </div>
            </div>
            <div className="thunder container 80"></div>
            <div className="absolute top-0 left-0 w-full h-full rain container z-[90]">
                {/* <div className={`${rain.backRowToggle} ${rain.splatToggle}"`}>
                    <div className={`${rain.rain} ${rain.frontRow}`}></div>
                    <div className={`${rain.rain} ${rain.backRow}`}></div>
                    <div className={rain.toggles}>
                        <div className={`${rain.splatToggle} ${rain.toggle} ${rain.active}`}>
                            SPLAT
                        </div>
                        <div className={`${rain.backRowToggle} ${rain.toggle} ${rain.active}`}>
                            BACK
                            <br />
                            ROW
                        </div>
                        <div className={`${rain.singleToggle} ${rain.toggle}`}>SINGLE</div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};
