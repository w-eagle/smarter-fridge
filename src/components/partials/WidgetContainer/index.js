import { Clock } from "../Clock";
import { Shortcuts } from "../Shortcuts";
import { Weather } from "../Weather";
import {
    Notes,
    ModalLightbox,
    NoteForm,
    AlertsSelector,
    TimerForm,
    TimersAndReminders,
    TimerEllapsed
} from "../../dummy/";
import styles from "./styles.module.css";
import fullScreenIcon from "../../../../public/fullScreen.png";
import timerIcon from "../../../../public/timer.svg";
import bellIcon from "../../../../public/bell.svg";
import eggIcon from "../../../../public/An_egg.png";
import friesIcon from "../../../../public/Fries.png";
import noteIcon from "../../../../public/note.svg";
import sweetPotIcon from "../../../../public/sweet_pot.jpg";
import bakedPotIcon from "../../../../public/baked_pota.jpg";
import pressurePotIcon from "../../../../public/pressure_pot.jpg";
import roastIcon from "../../../../public/roast.jpg";
import { useEffect, useState } from "react";
import { useModalContext } from "@/context/modalContext";
import dayjs from "dayjs";

export const WidgetContainer = ({ currentWeather, forecast, screenRef, calendarEvents }) => {
    const [showModal, closeModal] = useModalContext();
    const [notes, setNotes] = useState([]);
    const [timers, setTimers] = useState([]);

    useEffect(() => {
        const localStorageNotes = localStorage.getItem("notes");
        const savedTimers = localStorage.getItem("timers");

        if (localStorageNotes) {
            setNotes(JSON.parse(localStorageNotes));
        }
        if (savedTimers) {
            const parsedTimers = JSON.parse(savedTimers).map((t) => ({
                ...t,
                startTime: dayjs(t.startTime),
                endTime: dayjs(t.endTime)
            }));

            setTimers(parsedTimers);
        }
    }, []);

    const enterFullscreen = () => {
        const elem = screenRef.current;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    };

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            enterFullscreen();
        } else {
            exitFullscreen();
        }
    };

    const handleNoteRemove = (note) => {
        const allNotes = [...notes.filter((n) => n !== note)];
        localStorage.setItem("notes", JSON.stringify(allNotes));
        setNotes(allNotes);
    };

    const createNote = (note) => {
        if (note) {
            const localStorageNotes = localStorage.getItem("notes");
            const parsedNotes = localStorageNotes ? JSON.parse(localStorageNotes) : [];

            const newNotes = parsedNotes ? [...parsedNotes, note] : [note];
            localStorage.setItem("notes", JSON.stringify(newNotes));

            setNotes((n) => [...n, note]);
        }
        closeModal();
    };

    const createTimer = (name, time, icon) => {
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            return closeModal();
        }
        const now = dayjs();
        const nowWithAddedHours = now.add(time.hours, "hour");
        const nowWithAddedMinutes = nowWithAddedHours.add(time.minutes, "minute");
        const nowWithAddedSeconds = nowWithAddedMinutes.add(time.seconds, "second");

        const newTimers = [
            {
                name,
                id: Date.now(),
                startTime: now,
                icon: icon ? icon : "",
                endTime: nowWithAddedSeconds
            },
            ...timers
        ];

        localStorage.setItem("timers", JSON.stringify(newTimers));

        setTimers(newTimers);
        closeModal();
    };

    const timerTemplates = [
        { name: "Test", icon: eggIcon.src, time: { hours: 0, minutes: 0, seconds: 10 } },
        { name: "Egg", icon: eggIcon.src, time: { hours: 0, minutes: 10, seconds: 0 } },
        {
            name: "Sweet potatoe",
            icon: sweetPotIcon.src,
            time: { hours: 0, minutes: 20, seconds: 0 }
        },
        { name: "Fries", icon: friesIcon.src, time: { hours: 0, minutes: 25, seconds: 0 } },
        {
            name: "Pressure pot",
            icon: pressurePotIcon.src,
            time: { hours: 0, minutes: 25, seconds: 0 }
        },
        { name: "Roast", icon: roastIcon.src, time: { hours: 0, minutes: 45, seconds: 0 } },
        {
            name: "Baked potatoe",
            icon: bakedPotIcon.src,
            time: { hours: 1, minutes: 0, seconds: 0 }
        }
    ];

    const handleTimerRemove = (timer) => {
        const newTimers = [...timers].filter((t) => t.id !== timer.id);

        localStorage.setItem("timers", JSON.stringify(newTimers));
        setTimers(newTimers);
    };

    const handleTimerEnd = (timer) => {
        showModal(
            <ModalLightbox handleClickAway={closeModal}>
                <TimerEllapsed
                    closeModal={closeModal}
                    timer={timer}
                    handleTimerRemove={handleTimerRemove}
                />
            </ModalLightbox>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.widgetContainerLeft}>
                <Clock calendarEvents={calendarEvents} />
            </div>
            <div className={styles.widgetContainerRight}>
                {!currentWeather || !forecast ? null : (
                    <Weather currentWeather={currentWeather} forecast={forecast} />
                )}
            </div>
            <div className={styles.widgetContainerLeft}>
                {!notes || notes.length <= 0 ? null : (
                    <Notes notes={notes} handleNoteRemove={handleNoteRemove} />
                )}
            </div>
            <div className={styles.widgetContainerRight}>
                {timers?.length > 0 ? (
                    <TimersAndReminders
                        timers={timers}
                        handleTimerEnd={handleTimerEnd}
                        handleTimerRemove={handleTimerRemove}
                    />
                ) : null}
            </div>
            <div className={`${styles.lastRow} ${styles.widgetContainerLeft}`}>
                <Shortcuts />
            </div>
            <button
                className="widgetBackground text-white w-[40px] p-[5px] animate hover:opacity-100 opacity-40 rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer bottom-[20px] right-[20px] absolute z-[100]"
                onClick={handleFullscreen}
            >
                <img src={fullScreenIcon.src} />
            </button>
            <div className="top-[55%] right-0 absolute z-[100]">
                <button
                    className="block widgetBackground w-[40px] h-[60px] p-[8px] animate rounded-l-lg backdrop-blur-sm border-l border-t border-b border-slate-600 cursor-pointer"
                    onClick={() => {
                        showModal(
                            <ModalLightbox handleClickAway={closeModal}>
                                <NoteForm handleSubmit={createNote} handleCancel={closeModal} />
                            </ModalLightbox>
                        );
                    }}
                >
                    <img className="w-full h-full" src={noteIcon.src} />
                </button>
                <button
                    className="mt-[10px] widgetBackground w-[40px] h-[60px] p-[8px] animate rounded-l-lg backdrop-blur-sm border-l border-t border-b border-slate-600 cursor-pointer"
                    onClick={() => {
                        showModal(
                            <ModalLightbox handleClickAway={closeModal}>
                                <TimerForm
                                    handleSubmit={createTimer}
                                    handleCancel={closeModal}
                                    templates={timerTemplates}
                                />
                            </ModalLightbox>
                        );
                    }}
                >
                    <img className="w-full h-full" src={timerIcon.src} />
                </button>
            </div>
        </div>
    );
};
