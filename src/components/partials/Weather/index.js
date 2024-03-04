import { useState } from "react";
import dayjs from "dayjs";

import { ForecastCard, WeatherByHourPanel } from "../../dummy/";
import { getForecastByHour } from "../../../actions/getForecastByHour";

import sunriseIcon from ".././../../../public/sunrise.svg";
import sunsetIcon from ".././../../../public/sunset.svg";
import moonriseIcon from ".././../../../public/moonrise.svg";
import moonsetIcon from ".././../../../public/moonset.svg";

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

    const timeout = setTimeout(() => (expanded ? expand(false) : null), 1000 * 60);

    return (
        <div
            className={`${
                expanded ? "w-full h-full" : "w-[300px] h-[142px]"
            } widgetBackground animated inline-block px-8 py-4 rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
        >
            <div
                className={`${
                    expanded
                        ? "grid grid-cols-2 h-full w-full gap-[20px]"
                        : "flex-col justify-center items-center"
                } text-white animated`}
            >
                <div
                    className={`${
                        expanded ? "opacity-1 animationDelay" : " opacity-0"
                    } animate h-full w-full`}
                >
                    {expanded ? (
                        <WeatherByHourPanel
                            title={getTitle(selectedForecastDay)}
                            forecastByHour={forecastByHour}
                        />
                    ) : null}
                </div>
                <div className={`${expanded ? "flex-col" : ""}`}>
                    <div className="w-full flex justify-end">
                        <div className={`flex flex-col justify-center text-white mr-[30px]`}>
                            <div className="flex w-[125px]">
                                <div className="text-center mr-[10px]">
                                    <img className="w-[60px] h-[60px]" src={sunriseIcon.src} />
                                    <p className="text-xs font-bold">{todaysAstro.sunrise}</p>
                                </div>
                                <div className="text-center  mr-[10px]">
                                    <img className="w-[60px] h-[60px]" src={sunsetIcon.src} />
                                    <p className="text-xs font-bold">{todaysAstro.sunset}</p>
                                </div>
                            </div>
                            {expanded ? (
                                <div className="flex w-[125px]">
                                    <div className="text-center">
                                        <img className="w-[60px] h-[60px]" src={moonriseIcon.src} />
                                        <p className="text-xs font-bold max-w-[55px]">
                                            {todaysAstro.moonrise}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <img className="w-[60px] h-[60px]" src={moonsetIcon.src} />
                                        <p className="text-xs font-bold max-w-[55px]">
                                            {todaysAstro.moonset}
                                        </p>
                                    </div>
                                </div>
                            ) : null}
                        </div>
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
                            className={`inline-block text-white`}
                        >
                            <div className="flex items-center justify-center w-[80px]">
                                <img
                                    className="w-[60px] h-[60px]"
                                    src={currentWeather.current.condition.icon}
                                />
                                <p className="drop-shadow-xl text-3xl">
                                    {currentWeather.current.temp_c}°
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="drop-shadow-xl text-md">
                                    {currentWeather.location.name}
                                </p>
                                <p className="drop-shadow-xl text-sm">
                                    {currentWeather.current.condition.text}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className={`${
                            expanded ? "opacity-1 animationDelay" : " opacity-0"
                        } animate`}
                    >
                        {expanded ? (
                            <div className="mt-[25px] w-full flex justify-end items-center">
                                {forecast.forecast.forecastday.map((day, index) => (
                                    <ForecastCard
                                        key={`forecast_card_${day.date}_${index}`}
                                        dayName={dayjs(day.date).format("ddd")}
                                        maxTemp={day.day.maxtemp_c}
                                        minTemp={day.day.mintemp_c}
                                        icon={day.day.condition.icon}
                                        chanceOfRain={day.day.daily_chance_of_rain}
                                        isSelected={
                                            selectedForecastDay ===
                                            dayjs(day.date).format("YYYY-MM-DD")
                                        }
                                        handleClick={() =>
                                            selectForecastDay(dayjs(day.date).format("YYYY-MM-DD"))
                                        }
                                    />
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
