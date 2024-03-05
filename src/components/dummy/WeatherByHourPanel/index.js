import dayjs from "dayjs";
import waterDrop from "../../../../public/water-drop.svg";

export const WeatherByHourPanel = ({ title, forecastByHour }) => (
    <div className="w-full">
        <div className="border-b mb-[10px]">
            <p className="text-xl">{title}</p>
        </div>
        <div className="max-h-[350px] overflow-auto pr-[20px]">
            {forecastByHour.map((weather, index) => (
                <div
                    key={`forecast_by_hour-${title}_${weather.condition.text}_${index}`}
                    className="grid grid-cols-4 grid-cols-[50px_60px_1fr_40px] text-md items-center"
                >
                    <p>{dayjs.unix(weather.time_epoch).format("HH:mm")}</p>
                    <div className="flex items-center">
                        <img className="w-[10px] mr-[5px]" src={waterDrop.src} />
                        <p>{weather.chance_of_rain}%</p>
                    </div>
                    <div className="flex items-center">
                        <img className="w-[30px] mr-[5px]" src={weather.condition.icon} />
                        <p className="max-w-[210px] truncate  ...">{weather.condition.text}</p>
                    </div>
                    <p className="text-right">{weather.temp_c.toFixed()}°</p>
                </div>
            ))}
        </div>
    </div>
);
