export const getCurrentWeather = async ({ signal }) => {
    const weather = await fetch("/api/weather", { signal });

    if (!signal.aborted) {
        if (weather.ok) {
            const json = await weather.json();

            return json;
        } else {
            console.error(`HTTP error! Status: ${weather.status}`);
            return { error: true };
        }
    }
};
