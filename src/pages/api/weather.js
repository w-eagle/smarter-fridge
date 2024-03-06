export default async function GET(req, res) {
    const weather = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${process.env.POST_CODE}`
    );

    const json = await weather.json();
    console.log("getting weather", new Date());

    res.status(200).send(json);
}
