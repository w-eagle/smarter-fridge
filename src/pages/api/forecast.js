export default async function GET(req, res) {
    const forecast = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${process.env.POST_CODE}&days=3`
    );

    const json = await forecast.json();
    console.log("getting forecast", new Date());

    res.status(200).send(json);
}
