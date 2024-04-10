export default async function GET(req, res) {
    try {
        const token = decodeURIComponent(req.query.token);
        const calendarEvents = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${process.env.EMAIL_ADDRESS}/events?key=${process.env.GOOGLE_API_KEY}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const json = await calendarEvents.json();
        console.log("getting calendar events", new Date());

        res.status(200).send(json);
    } catch (e) {
        console.log(e);
    }
}
