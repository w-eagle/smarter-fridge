import dayjs from "dayjs";

export const getForecastByHour = ({ forecast, date }) => {
    const currentHour = dayjs().hour();
    const today = date;
    const tomorrow = dayjs(date).add(1, "day").format("YYYY-MM-DD");

    const todaysForecast = forecast.forecast.forecastday.find((day) => day.date === today).hour;
    const tomorrowsForecast = forecast?.forecast?.forecastday?.find(
        (day) => day.date === tomorrow
    )?.hour;

    const todaysForecastCurrentHourIndex = todaysForecast.findIndex(
        (day) => dayjs.unix(day.time_epoch).hour() === currentHour
    );

    const todaysForecastFromCurrentHour = todaysForecast.slice(
        todaysForecastCurrentHourIndex,
        todaysForecast.length
    );

    console.log("tomorrows forecast", tomorrowsForecast);

    let tomorrowsForecastFromMidnight = [];

    if (tomorrowsForecast) {
        tomorrowsForecastFromMidnight = tomorrowsForecast.slice(
            0,
            24 - todaysForecastFromCurrentHour.length
        );
    }

    return [...todaysForecastFromCurrentHour, ...tomorrowsForecastFromMidnight];
};
