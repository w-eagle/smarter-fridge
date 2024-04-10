export const getCalendarEvents = async ({ token, signal }) => {
    try {
        const res = await fetch(`/api/calendar?token=${token}`, { signal });

        if (!signal.aborted) {
            if (res.ok) {
                const json = await res.json();

                return json;
            } else {
                console.error(`HTTP error! Status: ${res.status}`);
                return { error: true };
            }
        }
    } catch (e) {
        console.log(e);
        return { error: e };
    }
};
