export const Notes = ({ notes, handleNoteRemove }) => {
    if (!notes || notes.length <= 0) {
        return;
    }

    return (
        <div
            className={`animated max-w-[710px] h-full widgetBackground animated px-8 py-4 rounded-lg backdrop-blur-sm border border-slate-600 cursor-pointer`}
        >
            <div className={`w-full h-full text-black animated overflow-auto`}>
                {notes.map((note) => (
                    <div className="inline-block w-[300px] h-[300px] bg-yellow-300 mr-4 mb-4 px-4 py-2 relative">
                        {note}
                        <button
                            onClick={() => handleNoteRemove(note)}
                            className="absolute top-2 right-2"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
