export const EventList = ({ title, currentEvents }) => (
    <div className="w-full">
        <div className="border-b mb-[10px]">
            <p className="text-xl">{title}</p>
        </div>
        <div className="max-h-[350px] overflow-auto pr-[20px]">
            {/* {events.map((event, index) => (
                <div
                    key={`forecast_by_hour-${title}_${events.text}_${index}`}
                    className="grid grid-cols-4 grid-cols-[50px_60px_1fr_40px] text-lg items-center"
                >
                    <p>place for event</p>
                </div>
            ))} */}
        </div>
    </div>
);
