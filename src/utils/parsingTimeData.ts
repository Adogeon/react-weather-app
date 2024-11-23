export function parsingTimeData(time: string) {
    const [dayString, timeString] = time.split(" ");
    const hourString = timeString.split(":")[0];

    return { dayString, timeString, hourString };
}