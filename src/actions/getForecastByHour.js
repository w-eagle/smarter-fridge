import dayjs from "dayjs";

export const getForecastByHour = ({ forecast, date }) => {
    const currentHour = dayjs().hour();
    const isForecastForToday = dayjs().format("YYYY-MM-DD") === date;

    const todaysForecastByHour = forecast?.forecast?.forecastday?.find(
        (day) => day?.date === date
    )?.hour;

    const todaysForecastCurrentHourIndex = todaysForecastByHour.findIndex(
        (day) => dayjs.unix(day.time_epoch).hour() === currentHour
    );

    const todaysForecastFromCurrentHour = todaysForecastByHour.slice(
        todaysForecastCurrentHourIndex,
        todaysForecastByHour.length
    );

    return isForecastForToday ? todaysForecastFromCurrentHour : todaysForecastByHour;
};
