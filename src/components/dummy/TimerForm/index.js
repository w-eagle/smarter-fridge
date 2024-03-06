import { useState } from "react";
import chevron from "../../../../public/chevron-up.svg";

export const TimerForm = ({ templates, handleCancel, handleSubmit }) => {
    const [timerName, setName] = useState();
    const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="text-white widgetBackground backdrop-blur-sm rounded-lg w-1/2 h-[450px] px-8 py-4"
        >
            <p>Select timer</p>

            <div className="text-white items-center mt-[20px]">
                {templates.map((template, index) => (
                    <button
                        key={`shortcut_${template.name}_${index}`}
                        className="w-[80px] px-[10px] pb-[10px] text-center inline-block w-2/12"
                        onClick={() => handleSubmit(template.name, template.time, template.icon)}
                    >
                        <p className="mb-[0] h-[50px]">{template.name}</p>
                        <img
                            className="p-[5px] object-cover w-[60px] mx-auto h-[60px] rounded-3xl"
                            src={template.icon}
                        />
                        <p className="text-xs">
                            {template.time.hours.toString().padStart(2, "0")}:
                            {template.time.minutes.toString().padStart(2, "0")}:
                            {template.time.seconds.toString().padStart(2, "0")}
                        </p>
                    </button>
                ))}
            </div>

            <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="widgetBackground w-full rounded-lg px-4 py-2 mt-[10px]"
            />
            <div className="flex justify-center mt-[20px]">
                <div className="text-center mx-[10px] flex flex-col items-center">
                    <p className="text-xs text-slate-300">Hours</p>
                    <button
                        onClick={() =>
                            setTimer((current) => ({ ...current, hours: current.hours + 1 }))
                        }
                    >
                        <img className="w-[35px]" src={chevron.src} />
                    </button>
                    <p className="text-3xl">{timer.hours.toString().padStart(2, "0")}</p>
                    <button
                        onClick={() => {
                            if (timer.hours >= 1) {
                                setTimer((current) => ({ ...current, hours: current.hours - 1 }));
                            }
                        }}
                    >
                        <img className="rotate-[180deg] w-[35px]" src={chevron.src} />
                    </button>
                </div>
                <div className="text-center mx-[10px] flex flex-col items-center">
                    <p className="text-xs text-slate-300">Minutes</p>
                    <button
                        onClick={() => {
                            if (timer.minutes === 59) {
                                return setTimer((current) => ({
                                    ...current,
                                    minutes: 0,
                                    hours: current.hours + 1
                                }));
                            }
                            setTimer((current) => ({ ...current, minutes: current.minutes + 1 }));
                        }}
                    >
                        <img className="w-[35px]" src={chevron.src} />
                    </button>
                    <p className="text-3xl">{timer.minutes.toString().padStart(2, "0")}</p>
                    <button
                        onClick={() => {
                            if (timer.minutes >= 1) {
                                setTimer((current) => ({
                                    ...current,
                                    minutes: current.minutes - 1
                                }));
                            }
                        }}
                    >
                        <img className="rotate-[180deg] w-[35px]" src={chevron.src} />
                    </button>
                </div>
                <div className="text-center mx-[10px] flex flex-col items-center">
                    <p className="text-xs text-slate-300">Seconds</p>
                    <button
                        onClick={() => {
                            if (timer.seconds === 59) {
                                return setTimer((current) => ({
                                    ...current,
                                    seconds: 0,
                                    minutes: current.minutes + 1
                                }));
                            }
                            setTimer((current) => ({ ...current, seconds: current.seconds + 1 }));
                        }}
                    >
                        <img className="w-[35px]" src={chevron.src} />
                    </button>
                    <p className="text-3xl">{timer.seconds.toString().padStart(2, "0")}</p>
                    <button
                        onClick={() => {
                            if (timer.seconds >= 1) {
                                setTimer((current) => ({
                                    ...current,
                                    seconds: current.seconds - 1
                                }));
                            }
                        }}
                    >
                        <img className="rotate-[180deg] w-[35px]" src={chevron.src} />
                    </button>
                </div>
            </div>

            <div className="w-full flex justify-between mt-[10px]">
                <button onClick={handleCancel} className="bg-red-600 rounded-lg px-4 py-1">
                    Cancel
                </button>
                <button
                    onClick={() => {
                        handleSubmit(timerName, timer);
                    }}
                    className="bg-green-600 rounded-lg px-4 py-1"
                >
                    Done
                </button>
            </div>
        </div>
    );
};
