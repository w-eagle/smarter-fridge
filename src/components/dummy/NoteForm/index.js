import { useState } from "react";

export const NoteForm = ({ handleCancel, handleSubmit }) => {
    const [note, setNote] = useState();

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="text-white widgetDarkBackground backdrop-blur-sm rounded-lg w-1/2 h-[350px] px-8 py-4"
        >
            <p>Type a note</p>
            <textarea
                onChange={(e) => setNote(e.target.value)}
                className="widgetDarkBackground w-full h-[240px] rounded-lg px-4 py-2 mt-[10px]"
            />
            <div className="w-full flex justify-between mt-[10px]">
                <button onClick={handleCancel} className="bg-red-600 rounded-lg px-4 py-1">
                    Cancel
                </button>
                <button
                    onClick={() => {
                        handleSubmit(note);
                    }}
                    className="bg-green-600 rounded-lg px-4 py-1"
                >
                    Done
                </button>
            </div>
        </div>
    );
};
