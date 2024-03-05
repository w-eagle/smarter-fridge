import closeIcon from "../../../../public/close.svg";

export const Notes = ({ notes, handleNoteRemove }) => {
    return (
        <div
            className={`animated max-w-[930px] h-full widgetBackground px-8 py-4 rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
        >
            <div className={`w-full h-full text-black animated overflow-x-auto whitespace-nowrap`}>
                {notes.map((note, index) => (
                    <div
                        key={`note_${index}`}
                        className="inline-block align-top w-[240px] h-[240px] bg-yellow-300 mr-4 mb-4 px-4 py-2 relative overflow-y-auto"
                    >
                        <div className="whitespace-pre-wrap">{note}</div>
                        <button
                            onClick={() => handleNoteRemove(note)}
                            className="absolute top-2 right-2"
                        >
                            <img className="w-[20px]" src={closeIcon.src} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
