export default function toHourDisplayText(hour: string): string {
    const intHour = parseInt(hour.split(":")[0]);
    if (isNaN(intHour)) {
        return "";
    } else {
        return intHour % 12 === 0
            ? (intHour === 0 ? "12 AM" : "12 PM")
            : (intHour < 12 ? `${intHour} AM` : `${intHour} PM`)
    }
}