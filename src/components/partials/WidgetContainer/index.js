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

import { useEffect, useState } from "react";
import { useModalContext } from "@/context/modalContext";
import dayjs from "dayjs";
import { SidePanel } from "../SidePanel";

export const WidgetContainer = ({ currentWeather, forecast, screenRef }) => {
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

    const handleNoteRemove = (note) => {
        const allNotes = [...notes.filter((n) => n !== note)];
        localStorage.setItem("notes", JSON.stringify(allNotes));
        setNotes(allNotes);
    };

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
                <Clock />
            </div>
            <div className={styles.widgetContainerRight}>
                {currentWeather && forecast ? (
                    <Weather currentWeather={currentWeather} forecast={forecast} />
                ) : null}
            </div>
            <div className={styles.widgetContainerLeft}>
                {notes && notes.length > 0 ? (
                    <Notes notes={notes} handleNoteRemove={handleNoteRemove} />
                ) : null}
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
            <SidePanel
                timers={timers}
                setTimers={setTimers}
                setNotes={setNotes}
                screenRef={screenRef}
            />
        </div>
    );
};
