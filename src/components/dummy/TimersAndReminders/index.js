import dayjs from "dayjs";
import { useEffect, useState } from "react";
import bell from "../../../../public/timer.svg";
import { useModalContext } from "@/context/modalContext";
import { ModalLightbox } from "../ModalLightbox";

export const TimersAndReminders = ({ timers, handleTimerEnd, handleTimerRemove }) => {
    const [displayedTimers, setDisplayedTimers] = useState([]);
    const [openModal, closeModal] = useModalContext();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = dayjs();
            const _timers = timers.map((timer) => {
                if (dayjs().isAfter(timer.endTime)) {
                    handleTimerEnd(timer);
                    const timeLeft = Math.abs(timer.endTime.diff(now, "second"));
                    const hours = Math.floor(timeLeft / 3600);
                    const minutes = Math.floor((timeLeft % 3600) / 60);
                    const seconds = timeLeft % 60;

                    return {
                        ...timer,
                        timeLeft: {
                            hours: hours.toString().padStart(2, "0"),
                            minutes: minutes.toString().padStart(2, "0"),
                            seconds: seconds.toString().padStart(2, "0")
                        },
                        elapsed: true
                    };
                }

                const timeLeft = timer.endTime.diff(now, "second");
                const hours = Math.floor(timeLeft / 3600);
                const minutes = Math.floor((timeLeft % 3600) / 60);
                const seconds = timeLeft % 60;

                return {
                    ...timer,
                    timeLeft: {
                        hours: hours.toString().padStart(2, "0"),
                        minutes: minutes.toString().padStart(2, "0"),
                        seconds: seconds.toString().padStart(2, "0")
                    }
                };
            });

            setDisplayedTimers(_timers);
        }, 1000);

        return () => clearInterval(timer);
    }, [timers]);

    return (
        <div
            className={`widgetBackground flex h-full w-full px-8 items-center rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className="flex text-white items-center">
                {displayedTimers.map((timer, index) => (
                    <button
                        key={`shortcut_${timer.name}_${index}`}
                        className="w-[80px] mx-[10px] text-center"
                        onClick={() =>
                            openModal(
                                <ModalLightbox handleClickAway={closeModal}>
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-white widgetBackground backdrop-blur-sm rounded-lg w-full h-full px-8 py-4 flex items-center justify-center"
                                    >
                                        <div className="w-1/2 h-1/6 rounded-lg px-[50px] py-[50px] widgetBackground flex flex-col items-center justify-center">
                                            <div className="flex flex-col justify-between">
                                                <p className="text-lg mb-[20px]">
                                                    Are you sure you want to remove{" "}
                                                    {timer.name ? `'${timer.name}' ` : ""}timer
                                                </p>
                                                <div className="flex justify-between px-[20px]">
                                                    <button
                                                        onClick={() => closeModal()}
                                                        className="bg-green-600 rounded-lg px-4 py-1"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleTimerRemove(timer);
                                                            closeModal();
                                                        }}
                                                        className="bg-red-600 rounded-lg px-4 py-1"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ModalLightbox>
                            )
                        }
                    >
                        <p className="text-lg">{timer.name}</p>
                        <img
                            className="rounded-xl my-[10px] w-[60px] h-[60px] mx-auto"
                            src={timer.icon ? timer.icon : bell.src}
                        />
                        <p>
                            {timer.elapsed ? "-" : ""}
                            {timer.timeLeft.hours}:{timer.timeLeft.minutes}:{timer.timeLeft.seconds}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};
