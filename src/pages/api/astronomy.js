export default async function GET(req, res) {
    const astronomy = await fetch(
        `http://api.weatherapi.com/v1/astronomy.json?key=${process.env.WEATHER_API_KEY}&q=${process.env.POST_CODE}`
    );

    const json = await astronomy.json();
    console.log("astronomy \n\n\n\n\n\n", json);

    res.status(200).send(json);
}
