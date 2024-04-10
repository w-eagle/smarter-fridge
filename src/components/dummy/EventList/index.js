import dayjs from "dayjs";

export const EventList = ({ title, currentEvents }) => (
    <div className="w-full">
        <div className="border-b mb-[10px]">
            <p className="text-xl">{title}</p>
        </div>
        <div className="max-h-[350px] overflow-auto pr-[20px]">
            {currentEvents && currentEvents?.length > 0
                ? currentEvents.map((calendarEvent, index) => (
                      <div
                          key={`calendar_events_${title}_${index}`}
                          className="text-lg items-center mt-[10px]"
                      >
                          <p>
                              {dayjs(calendarEvent.start.dateTime).format("HH:mm")}
                              {"-"}
                              {dayjs(calendarEvent.end.dateTime).format("HH:mm")}
                          </p>
                          <p className="text-sm">{calendarEvent.summary}</p>
                      </div>
                  ))
                : null}
        </div>
    </div>
);
