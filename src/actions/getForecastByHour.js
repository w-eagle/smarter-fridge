import dayjs from "dayjs";

export const getForecastByHour = ({ forecast, date }) => {
    const currentHour = dayjs().hour();
    const isForecastForToday = dayjs().format("YYYY-MM-DD") === date;

    const todaysForecast = forecast.forecast.forecastday.find((day) => day.date === date).hour;

    const todaysForecastCurrentHourIndex = todaysForecast.findIndex(
        (day) => dayjs.unix(day.time_epoch).hour() === currentHour
    );

    const todaysForecastFromCurrentHour = todaysForecast.slice(
        todaysForecastCurrentHourIndex,
        todaysForecast.length
    );

    return isForecastForToday ? todaysForecastFromCurrentHour : todaysForecast;
};
