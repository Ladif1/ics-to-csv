import { fileFromUrl } from "./Utils/fileFromUrl";
import { Event } from "./Models/event";
var fs = require('fs');

const allEvents: Event[] = [];

async function main() {
    const url = "https://adelb.univ-lyon1.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=2&projectId=3&calType=ical&firstDate=2024-03-11&lastDate=2024-03-17";
    const buffer = await fileFromUrl(url);
    let event: Event | undefined;
    for (const line of buffer) {
        if (line.includes("BEGIN:VEVENT")) {
            event = new Event();
        } else if (line.includes("UID:")) {
            if (event) {
                event.uid = line.split(":")[1].trim();
            }
        } else if (line.includes("SUMMARY:")) {
            if (event) {
                event.summary = line.split(":")[1].trim();
            }
        } else if (line.includes("DTSTART:")) {
            if (event) {
                event.start = line.split(":")[1].trim();
            }
        } else if (line.includes("DTEND:")) {
            if (event) {
                event.end = line.split(":")[1].trim();
            }
        } else if (line.includes("LOCATION:")) {
            if (event) {
                event.salles = line.split(":")[1].trim();
            }
        } else if (line.includes("END:VEVENT")) {
            if (event) {
                allEvents.push(event);
            }
        }
    }

    // put in csv file
    let csv = "UID,SUMMARY,START,END,SALLES\n";
    for (const event of allEvents) {
        csv += `${event.uid},${event.summary.split(",").join(" ")},${event.start},${event.end},${event.salles.split(",").join(" ")}\n`;
    }
    fs.writeFileSync("events.csv", csv);
}

main();