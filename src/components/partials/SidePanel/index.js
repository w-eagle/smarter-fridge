import eggIcon from "../../../../public/An_egg.png";
import friesIcon from "../../../../public/Fries.png";
import sweetPotIcon from "../../../../public/sweet_pot.jpg";
import bakedPotIcon from "../../../../public/baked_pota.jpg";
import pressurePotIcon from "../../../../public/pressure_pot.jpg";
import roastIcon from "../../../../public/roast.jpg";

import { ModalLightbox, NoteForm, SidePanelButtons, TimerForm } from "@/components/dummy";
import { useModalContext } from "@/context/modalContext";
import dayjs from "dayjs";

export const SidePanel = ({ timers, setTimers, setNotes }) => {
    const [showModal, closeModal] = useModalContext();

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

    const createNote = (note) => {
        if (note) {
            console.log(note);
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

    const handleNoteClick = () => {
        showModal(
            <ModalLightbox handleClickAway={closeModal}>
                <NoteForm handleSubmit={createNote} handleCancel={closeModal} />
            </ModalLightbox>
        );
    };

    const handleTimerClick = () => {
        showModal(
            <ModalLightbox handleClickAway={closeModal}>
                <TimerForm
                    handleSubmit={createTimer}
                    handleCancel={closeModal}
                    templates={timerTemplates}
                />
            </ModalLightbox>
        );
    };

    return (
        <SidePanelButtons
            handleFullscreen={handleFullscreen}
            handleNoteClick={handleNoteClick}
            handleTimerClick={handleTimerClick}
        />
    );
};
