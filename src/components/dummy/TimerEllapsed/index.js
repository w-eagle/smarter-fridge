import { useEffect, useRef, useState } from "react";
import alarm from "../../../../public/alarm.mp3";
import bell from "../../../../public/ringing-bell.svg";
import styles from "./styles.module.css";
import dayjs from "dayjs";

export const TimerEllapsed = ({ timer, closeModal, handleTimerRemove }) => {
    const alarmRef = useRef(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const elapse = setInterval(() => {
            const timeLeft = Math.abs(timer.endTime.diff(dayjs(), "second"));
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;

            setElapsedTime({
                hours: hours.toString().padStart(2, "0"),
                minutes: minutes.toString().padStart(2, "0"),
                seconds: seconds.toString().padStart(2, "0")
            });
        }, 1000);

        return () => clearInterval(elapse);
    }, []);

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                alarmRef.current.pause();
                handleTimerRemove(timer);
                closeModal();
            }}
            className="text-white widgetBackground backdrop-blur-sm rounded-lg w-full h-full px-8 py-4 flex items-center justify-center"
        >
            <div className="w-1/2 h-1/2 widgetBackground flex flex-col items-center justify-center">
                <p className="text-3xl">{timer.name}</p>
                <div>
                    <audio ref={alarmRef} autoPlay loop>
                        <source src={alarm} />
                    </audio>
                    <img
                        className={`${styles.bellAnimation} w-[200px] mt-[20px] mb-[20px] rounded-lg`}
                        src={timer?.icon ? timer.icon : bell.src}
                    />
                    <p className="text-2xl mb-[20px] text-center">
                        -{elapsedTime.hours}:{elapsedTime.minutes}:{elapsedTime.seconds}
                    </p>
                    <div className="w-full text-center">
                        <button className="bg-red-600 rounded-lg px-4 py-1">STOP</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
