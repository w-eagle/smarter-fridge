import arrowUp from "../../../../public/arrow-up.svg";
import waterDrop from "../../../../public/water-drop.svg";

export const ForecastCard = ({
    dayName,
    maxTemp,
    minTemp,
    icon,
    chanceOfRain,
    isSelected,
    handleClick
}) => (
    <div
        onClick={(e) => {
            e.stopPropagation();
            handleClick();
        }}
        className={`${
            isSelected ? "border" : ""
        } flex flex-col justify-center items-center text-center ml-[20px] py-2 px-4  rounded-lg`}
    >
        <div className="w-[40px] flex justify-between">
            <img className="w-[15px] mr-1" src={arrowUp.src} />
            <p>{maxTemp.toFixed()}</p>
        </div>
        <div className="w-[40px] flex justify-between">
            <img className="w-[15px] mr-1 rotate-180" src={arrowUp.src} />
            <p>{minTemp.toFixed()}</p>
        </div>
        <img className="mx-auto" src={icon} />
        <div className="flex justify-center mt-[2px]">
            <img className="w-[10px] mr-[2px]" src={waterDrop.src} />
            <p className="text-xs">{chanceOfRain}%</p>
        </div>
        <p>{dayName}</p>
    </div>
);
