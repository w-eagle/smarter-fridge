import icsToJson from "ics-to-json";

export default async function GET(req, res) {
    const icsRes = await fetch(process.env.GOOGLE_CALLENDAR);
    const icsData = await icsRes.text();

    const data = icsToJson(icsData);
    console.log("getting calendar events", new Date());

    console.log(data);

    res.status(200).send(data);
}
