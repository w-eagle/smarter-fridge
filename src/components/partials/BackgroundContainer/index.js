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

    const moonrise = dayjs(`${todaysAstro.date} ${todaysAstro.astro.sunset}`);
    const moonset = dayjs(`${tomorrowsAstro.date} ${tomorrowsAstro.astro.sunrise}`);

    const moonTimeOnSky = moonset.diff(moonrise) / 1000;

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

const getAmountOfClouds = (weather) => {
    const lightClouds = [
        "Partly cloudy",
        "Patchy rain possible",
        "Patchy snow possible",
        "Patchy sleet possible",
        "Patchy freezing drizzle possible",
        "Patchy light drizzle",
        "Light drizzle",
        "Freezing drizzle",
        "Patchy light rain",
        "Light rain",
        "Light freezing rain",
        "Light sleet",
        "Patchy light snow",
        "Light rain shower",
        "Light snow",
        "Light sleet showers",
        "Light snow showers",
        "Light showers of ice pellets",
        "Patchy light rain with thunder",
        "Patchy light snow with thunder"
    ];
    const moderateClouds = [
        "Cloudy",
        "Patchy moderate snow",
        "Ice pellets",
        "Moderate or heavy freezing rain",
        "Moderate rain at times",
        "Moderate rain",
        "Moderate snow",
        "Moderate or heavy rain shower",
        "Moderate or heavy sleet showers",
        "Moderate or heavy snow showers",
        "Moderate or heavy showers of ice pellets",
        "Moderate or heavy rain with thunder",
        "Moderate or heavy snow with thunder",
        "Moderate or heavy sleet"
    ];
    const heavyClouds = [
        "Overcast",
        "Heavy freezing drizzle",
        "Heavy rain at times",
        "Heavy rain",
        "Patchy heavy snow",
        "Torrential rain shower",
        "Heavy snow"
    ];

    if (lightClouds.includes(weather)) {
        return 1;
    }
    if (moderateClouds.includes(weather)) {
        return 2;
    }
    if (heavyClouds.includes(weather)) {
        return 3;
    }
    return 0;
};

export const BackgroundContainer = ({ currentWeather, forecast }) => {
    const [isDay, setDay] = useState(true);
    const [astroInfo, setAstroInfo] = useState(getAstroInfo(forecast));
    const [shouldShowSunrise, setShowingSunrise] = useState(false);
    const weatherConditions = currentWeather.current.condition.text;
    const amountOfClouds = getAmountOfClouds(weatherConditions);

    useEffect(() => {
        setAstroInfo(getAstroInfo(forecast));
    }, [forecast]);

    useEffect(() => {
        const int = setInterval(() => {
            const today = dayjs().format("YYYY-MM-DD");

            const todaysAstro = forecast.forecast.forecastday.find((day) => day.date === today);

            const sunrise = dayjs(`${todaysAstro.date} ${todaysAstro.astro.sunrise}`);
            const sunset = dayjs(`${todaysAstro.date} ${todaysAstro.astro.sunset}`);

            const now = dayjs();

            if (
                (!shouldShowSunrise &&
                    now.hour() === sunrise.hour() &&
                    now.minute() === sunrise.minute()) ||
                (now.hour() === sunset.hour() && now.minute() === sunset.minute())
            ) {
                setShowingSunrise(true);
            }

            if (now.isAfter(sunrise) && now.isBefore(sunset) && !isDay) {
                return setDay(true);
            } else if ((isDay && now.isAfter(sunset)) || now.isBefore(sunrise)) {
                return setDay(false);
            }
        }, 1000 * 60);

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
                className={`${!isDay ? styles.moon : styles.invisible}`}
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

            {amountOfClouds >= 1 ? (
                <div
                    className={`${styles.greyOverlay} z-[70] absolute top-0 left-0 w-full h-full`}
                />
            ) : null}

            {amountOfClouds >= 2 ? (
                <div
                    className={`${styles.greyOverlay} z-[70] absolute top-0 left-0 w-full h-full`}
                />
            ) : null}

            {amountOfClouds >= 3 ? (
                <div
                    className={`${styles.greyOverlay} z-[70] absolute top-0 left-0 w-full h-full`}
                />
            ) : null}

            <div className="z-[50] absolute top-0 left-0 w-full h-[200px]">
                <div className="w-full h-full relative">
                    {amountOfClouds >= 1 ? (
                        <>
                            <img className="absolute top-12 left-[85%]" src={cloud5.src} />
                            <img className="absolute top-10 left-[15%]" src={cloud3.src} />
                            <img className="absolute top-10 left-[42%]" src={cloud2.src} />
                        </>
                    ) : null}

                    {amountOfClouds >= 2 ? (
                        <>
                            <img className="absolute top-24 left-[23%]" src={cloud6.src} />
                            <img className="absolute top-20 left-[75%]" src={cloud8.src} />
                            <img className="absolute top-2 left-[32%]" src={cloud9.src} />
                        </>
                    ) : null}

                    {amountOfClouds >= 3 ? (
                        <div className="w-full h-full z-[200]">
                            <img className="absolute top-4 left-[65%]" src={cloud4.src} />
                            <img className="absolute top-4 left-[53%]" src={cloud7.src} />
                            <img className="absolute top-4 left-0" src={cloud1.src} />
                        </div>
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
