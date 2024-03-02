import { Clock } from "../Clock";
import { Shortcuts } from "../Shortcuts";
import { Weather } from "../Weather";
import { Notes, ModalLightbox, NoteForm, AlertsSelector, TimerForm } from "../../dummy/";
import styles from "./styles.module.css";
import fullScreenIcon from "../../../../public/fullScreen.png";
import timerIcon from "../../../../public/timer.svg";
import bellIcon from "../../../../public/bell.svg";
import eggIcon from "../../../../public/An_egg.png";
import friesIcon from "../../../../public/Fries.png";
import { useState } from "react";
import { useModalContext } from "@/context/modalContext";

export const WidgetContainer = ({ currentWeather, forecast, screenRef }) => {
    const [showModal, closeModal] = useModalContext();
    const [notes, setNotes] = useState([]);

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
        setNotes(allNotes);
    };

    const createNote = (note) => {
        if (note) {
            setNotes((n) => [...n, note]);
        }
        closeModal();
    };

    const timerTemplates = [
        { name: "Egg", icon: eggIcon.src, time: "00:10:00" },
        { name: "Fries", icon: friesIcon.src, time: "00:25:00" },
        { name: "Sweet potatoe", icon: "", time: "00:20:00" },
        { name: "Baked potatoe", icon: "", time: "1:00:00" },
        { name: "Pressure pot", icon: "", time: "00:25:00" },
        { name: "Roast", icon: "", time: "00:45:00" }
    ];

    const alertOptions = [
        {
            label: "Timer",
            icon: timerIcon.src,
            handleClick: () => {
                showModal(
                    <ModalLightbox handleClickAway={closeModal}>
                        <TimerForm
                            handleSubmit={createNote}
                            handleCancel={closeModal}
                            templates={timerTemplates}
                        />
                    </ModalLightbox>
                );
            }
        },
        {
            label: "Reminder",
            icon: bellIcon.src,
            handleClick: () => {
                closeModal();
            }
        }
    ];

    console.log(timerIcon);

    return (
        <div className={styles.container}>
            <div className={styles.widgetContainerLeft}>
                <Clock />
            </div>
            <div className={styles.widgetContainerRight}>
                <Weather currentWeather={currentWeather} forecast={forecast} />
            </div>
            <div className={styles.widgetContainerLeft}>
                <Notes notes={notes} handleNoteRemove={handleNoteRemove} />
            </div>
            <div className={styles.widgetContainerRight}></div>
            <div className={`${styles.lastRow} ${styles.widgetContainerLeft}`}>
                <Shortcuts />
            </div>
            <button
                className="widgetBackground text-white w-[40px] p-[5px] animate hover:opacity-100 opacity-40 rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer bottom-[20px] right-[20px] absolute z-[100]"
                onClick={handleFullscreen}
            >
                <img src={fullScreenIcon.src} />
            </button>
            <button
                className="widgetBackground text-white text-3xl w-[40px] h-[60px] p-[5px] animate rounded-r-lg backdrop-blur-sm border-r border-t border-b border-slate-600 cursor-pointer bottom-[400px] left-0 absolute z-[100]"
                onClick={() => {
                    showModal(
                        <ModalLightbox handleClickAway={closeModal}>
                            <NoteForm handleSubmit={createNote} handleCancel={closeModal} />
                        </ModalLightbox>
                    );
                }}
            >
                +
            </button>
            <button
                className="widgetBackground text-white text-3xl w-[40px] h-[60px] p-[5px] animate rounded-l-lg backdrop-blur-sm border-l border-t border-b border-slate-600 cursor-pointer bottom-[400px] right-0 absolute z-[100]"
                onClick={() => {
                    showModal(
                        <ModalLightbox handleClickAway={closeModal}>
                            <AlertsSelector alerts={alertOptions} />
                        </ModalLightbox>
                    );
                }}
            >
                +
            </button>
        </div>
    );
};
