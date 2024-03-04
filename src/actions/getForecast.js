export const getForecast = async ({ signal }) => {
    const forecast = await fetch("/api/forecast", { signal });

    if (!signal.aborted) {
        if (forecast.ok) {
            const json = await forecast.json();

            return json;
        } else {
            console.error(`HTTP error! Status: ${forecast.status}`);
            return { error: true };
        }
    }
};
