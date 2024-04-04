import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { ForecastCard, WeatherByHourPanel } from "../../dummy/";
import { getForecastByHour } from "../../../actions/getForecastByHour";
import styles from "./styles.module.css";

import sunriseIcon from ".././../../../public/sunrise.svg";
import sunsetIcon from ".././../../../public/sunset.svg";
import moonriseIcon from ".././../../../public/moonrise.svg";
import moonsetIcon from ".././../../../public/moonset.svg";

const CurrentWeatherDisplay = ({ expand, currentWeather, timeout }) => (
    <div
        onClick={() => {
            clearTimeout(timeout);
            expand((value) => {
                if (!value) {
                    timeout;
                }

                return !value;
            });
        }}
        className={`h-[120px] w-[130px]`}
    >
        <div className="flex items-center justify-center">
            <img className="w-[60px] h-[60px]" src={currentWeather.current.condition.icon} />
            <p className="drop-shadow-xl text-[50px]">{currentWeather.current.temp_c}°</p>
        </div>
        <div className="text-center">
            <p className="drop-shadow-xl text-xl">{currentWeather.current.condition.text}</p>
        </div>
    </div>
);

const RiseDisplay = ({ todaysAstro, expanded }) => (
    <div className={`flex flex-col justify-center items-center text-white mr-[0px]`}>
        <div
            className={`${
                expanded ? "pt-[15px]" : "pt-0"
            } flex w-[220px] justify-center animated animationDelay`}
        >
            <div className="text-center px-[5px] mr-[10px]">
                <img className="mx-auto w-[60px] h-[60px]" src={sunriseIcon.src} />
                <p className="text-lg font-bold">{todaysAstro.sunrise}</p>
            </div>
            <div className="text-center px-[5px] mr-[5px]">
                <img className="mx-auto w-[60px] h-[60px]" src={sunsetIcon.src} />
                <p className="text-lg font-bold">{todaysAstro.sunset}</p>
            </div>
        </div>
        <div
            className={`${
                expanded
                    ? "h-[110px] opacity-1 pt-[15px] animationDelay"
                    : "h-0 overflow-hidden opacity-0 pt-0"
            } flex w-[200px] justify-center animated`}
        >
            <div className="text-center px-[5px] mr-[10px]">
                <img className="mx-auto w-[60px] h-[60px]" src={moonriseIcon.src} />
                <p className="text-lg font-bold">{todaysAstro.moonrise}</p>
            </div>
            <div className="text-center px-[5px] mr-[5px]">
                <img className="mx-auto w-[60px] h-[60px]" src={moonsetIcon.src} />
                <p className="text-lg font-bold">{todaysAstro.moonset}</p>
            </div>
        </div>
    </div>
);

const getTitle = (selectedDate) => {
    const today = dayjs().format("YYYY-MM-DD");
    const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

    if (selectedDate === today) {
        return "Today";
    } else if (selectedDate === tomorrow) {
        return "Tomorrow";
    }
    return dayjs().add(2, "day").format("dddd");
};

export const Weather = ({ currentWeather, forecast }) => {
    const [expanded, expand] = useState(true);
    const [selectedForecastDay, selectForecastDay] = useState(dayjs().format("YYYY-MM-DD"));
    const [currentForecast, setCurrentForecast] = useState(forecast.forecast.forecastday);

    const forecastByHour = getForecastByHour({ forecast, date: selectedForecastDay });

    const todaysAstro = forecast.forecast.forecastday.find(
        (day) => day.date === dayjs().format("YYYY-MM-DD")
    ).astro;

    const timeout = setTimeout(() => (expanded ? expand(false) : null), 1000 * 60 * 2);

    useEffect(() => {
        setCurrentForecast(forecast.forecast.forecastday);
        selectForecastDay(dayjs().format("YYYY-MM-DD"));
    }, [forecast]);

    return (
        <div
            className={`${
                expanded ? "w-full h-full" : "w-[416px] h-[142px]"
            } overflow-hidden widgetBackground animated inline-block px-8 py-4 rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
        >
            <div
                className={`${
                    expanded ? styles.gridContainerExpanded : styles.gridContainerCollapsed
                } text-white animated`}
            >
                <div
                    className={`${styles.forecastContainer} ${
                        expanded ? "opacity-1 w-full h-full animationDelay" : "opacity-0 w-0 h-0"
                    } animated overflow-hidden`}
                >
                    <WeatherByHourPanel
                        title={getTitle(selectedForecastDay)}
                        forecastByHour={forecastByHour}
                    />
                </div>
                <div className={`${styles.weatherContainer} w-full flex justify-end items-start`}>
                    <div className="w-[350px] flex">
                        <RiseDisplay expanded={expanded} todaysAstro={todaysAstro} />
                        <CurrentWeatherDisplay
                            timeout={timeout}
                            expand={expand}
                            currentWeather={currentWeather}
                        />
                    </div>
                </div>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className={`${styles.forecastCardsContainer} flex overflow-hidden justify-end items-start`}
                >
                    <div
                        className={`${
                            expanded
                                ? "opacity-1  w-full animationDelay justify-end items-center"
                                : "opacity-0 w-0 h-0 items-start justify-end"
                        } flex overflow-hidden animated`}
                    >
                        {currentForecast.map((day, index) => (
                            <ForecastCard
                                key={`forecast_card_${day.date}_${index}`}
                                dayName={dayjs(day.date).format("ddd")}
                                maxTemp={day.day.maxtemp_c}
                                minTemp={day.day.mintemp_c}
                                icon={day.day.condition.icon}
                                chanceOfRain={day.day.daily_chance_of_rain}
                                isSelected={
                                    selectedForecastDay === dayjs(day.date).format("YYYY-MM-DD")
                                }
                                handleClick={() =>
                                    selectForecastDay(dayjs(day.date).format("YYYY-MM-DD"))
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
