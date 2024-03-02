import dayjs from "dayjs";
import waterDrop from "../../../../public/water-drop.svg";

export const WeatherByHourPanel = ({ title, forecastByHour }) => (
    <div className="w-full pr-[10px]">
        <div className="border-b mb-[10px]">
            <p>{title}</p>
        </div>
        {forecastByHour.map((weather) => (
            <div className="grid grid-cols-4 grid-cols-[50px_60px_1fr_40px] text-sm items-center">
                <p>{dayjs.unix(weather.time_epoch).format("HH:mm")}</p>
                <div className="flex items-center">
                    <img className="w-[10px] mr-[5px]" src={waterDrop.src} />
                    <p>{weather.chance_of_rain}%</p>
                </div>
                <div className="flex items-center">
                    <img className="w-[30px] mr-[5px]" src={weather.condition.icon} />
                    <p>{weather.condition.text}</p>
                </div>
                <p className="text-right">{weather.temp_c}°</p>
            </div>
        ))}
    </div>
);
