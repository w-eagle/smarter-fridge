import { useState } from "react";
import dayjs from "dayjs";

import { ForecastCard, WeatherByHourPanel } from "../../dummy/";
import { getForecastByHour } from "../../../actions/getForecastByHour";

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
        className={`inline-block text-white h-full w-[120px]`}
    >
        <div className="flex items-center justify-center">
            <img className="w-[60px] h-[60px]" src={currentWeather.current.condition.icon} />
            <p className="drop-shadow-xl text-[40px]">{currentWeather.current.temp_c}°</p>
        </div>
        <div className="text-center">
            <p className="drop-shadow-xl text-md">{currentWeather.current.condition.text}</p>
        </div>
    </div>
);

const RiseDisplay = ({ todaysAstro, expanded }) => (
    <div className={`flex flex-col justify-center items-center text-white mr-[0px]`}>
        <div className="flex w-[200px] justify-center">
            <div className="text-center px-[5px] mr-[10px]">
                <img className="mx-auto w-[60px] h-[60px]" src={sunriseIcon.src} />
                <p className="text-md font-bold">{todaysAstro.sunrise}</p>
            </div>
            <div className="text-center px-[5px] mr-[5px]">
                <img className="mx-auto w-[60px] h-[60px]" src={sunsetIcon.src} />
                <p className="text-md font-bold">{todaysAstro.sunset}</p>
            </div>
        </div>
        {expanded ? (
            <div className="flex w-[200px] justify-center">
                <div className="text-center px-[5px] mr-[10px]">
                    <img className="mx-auto w-[60px] h-[60px]" src={moonriseIcon.src} />
                    <p className="text-md font-bold">{todaysAstro.moonrise}</p>
                </div>
                <div className="text-center px-[5px] mr-[5px]">
                    <img className="mx-auto w-[60px] h-[60px]" src={moonsetIcon.src} />
                    <p className="text-md font-bold">{todaysAstro.moonset}</p>
                </div>
            </div>
        ) : null}
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
    if (!currentWeather || !forecast) {
        return;
    }

    const [expanded, expand] = useState(false);
    const [selectedForecastDay, selectForecastDay] = useState(dayjs().format("YYYY-MM-DD"));

    const forecastByHour = getForecastByHour({ forecast, date: selectedForecastDay });

    const todaysAstro = forecast.forecast.forecastday.find(
        (day) => day.date === dayjs().format("YYYY-MM-DD")
    ).astro;

    const timeout = setTimeout(() => (expanded ? expand(false) : null), 1000 * 60 * 99);

    return (
        <div
            className={`${
                expanded ? "w-full h-full" : "w-[380px] h-[142px]"
            } overflow-hidden widgetBackground animated inline-block px-8 py-4 rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
        >
            <div
                className={`${
                    expanded ? "h-full w-full" : "flex-col justify-center items-center"
                } flex text-white animated`}
            >
                <div
                    className={`${
                        expanded ? "opacity-1 w-1/2 h-full" : "opacity-0 w-0 h-0"
                    } animate`}
                >
                    <WeatherByHourPanel
                        title={getTitle(selectedForecastDay)}
                        forecastByHour={forecastByHour}
                    />
                </div>
                <div
                    className={`${
                        expanded ? "animationDelay w-1/2 flex-col" : "w-full h-full"
                    } flex animated items-end`}
                >
                    <div
                        className={`${
                            expanded ? "h-1/2 animationDelay" : "h-[142px]"
                        } w-full flex justify-end items-start`}
                    >
                        <RiseDisplay expanded={expanded} todaysAstro={todaysAstro} />
                        <CurrentWeatherDisplay
                            timeout={timeout}
                            expand={expand}
                            currentWeather={currentWeather}
                        />
                    </div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className={`${
                            expanded
                                ? "opacity-1 animationDelay w-full h-1/2 flex justify-end items-center"
                                : "opacity-0 w-0 h-0"
                        } animated overflow-hidden`}
                    >
                        <div className="w-full flex justify-end items-center">
                            {forecast.forecast.forecastday.map((day, index) => (
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
        </div>
    );
};
