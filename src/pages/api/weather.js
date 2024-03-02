const staticWeather = {
    location: {
        name: "Bedford",
        region: "Bedfordshire",
        country: "UK",
        lat: 52.15,
        lon: -0.45,
        tz_id: "Europe/London",
        localtime_epoch: 1708819402,
        localtime: "2024-02-25 0:03"
    },
    current: {
        last_updated_epoch: 1708819200,
        last_updated: "2024-02-25 00:00",
        temp_c: 2,
        temp_f: 35.6,
        is_day: 0,
        condition: {
            text: "Clear",
            icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
            code: 1000
        },
        wind_mph: 5.6,
        wind_kph: 9,
        wind_degree: 220,
        wind_dir: "SW",
        pressure_mb: 998,
        pressure_in: 29.47,
        precip_mm: 0,
        precip_in: 0,
        humidity: 100,
        cloud: 0,
        feelslike_c: -0.5,
        feelslike_f: 31.2,
        vis_km: 10,
        vis_miles: 6,
        uv: 1,
        gust_mph: 10.4,
        gust_kph: 16.8
    }
};

export default async function GET(req, res) {
    const weather = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${process.env.POST_CODE}`
    );

    const json = await weather.json();
    console.log("current \n\n\n\n\n\n", json);

    res.status(200).send(json);
    // res.status(200).json(staticWeather);
}
