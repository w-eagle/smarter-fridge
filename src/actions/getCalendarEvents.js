export const getCalendarEvents = async ({ signal }) => {
    const events = await fetch("/api/calendar", { signal });

    if (!signal.aborted) {
        if (events.ok) {
            const json = await events.json();

            return json;
        } else {
            console.error(`HTTP error! Status: ${events.status}`);
            return { error: true };
        }
    }
};
