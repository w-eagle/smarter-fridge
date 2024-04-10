export default async function GET(req, res) {
    try {
        const astronomy = await fetch(
            `http://api.weatherapi.com/v1/astronomy.json?key=${process.env.WEATHER_API_KEY}&q=${process.env.POST_CODE}`
        );

        const json = await astronomy.json();
        console.log("getting astronomy", new Date());

        res.status(200).send(json);
    } catch (e) {
        console.log(e);
    }
}
