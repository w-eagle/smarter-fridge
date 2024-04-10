import fullScreenIcon from "../../../../public/fullScreen.png";
import timerIcon from "../../../../public/timer.svg";
import noteIcon from "../../../../public/note.svg";

export const SidePanelButtons = ({ handleFullscreen, handleNoteClick, handleTimerClick }) => (
    <>
        <button
            className="widgetBackground text-white w-[40px] p-[5px] animate hover:opacity-100 opacity-40 rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer bottom-[20px] right-[20px] absolute z-[100]"
            onClick={handleFullscreen}
        >
            <img src={fullScreenIcon.src} />
        </button>
        <div className="top-[55%] right-0 absolute z-[100]">
            <button
                className="block widgetBackground w-[40px] h-[60px] p-[8px] animate rounded-l-lg backdrop-blur-sm border-l border-t border-b border-slate-600 cursor-pointer"
                onClick={handleNoteClick}
            >
                <img className="w-full h-full" src={noteIcon.src} />
            </button>
            <button
                className="mt-[10px] widgetBackground w-[40px] h-[60px] p-[8px] animate rounded-l-lg backdrop-blur-sm border-l border-t border-b border-slate-600 cursor-pointer"
                onClick={handleTimerClick}
            >
                <img className="w-full h-full" src={timerIcon.src} />
            </button>
        </div>
    </>
);
