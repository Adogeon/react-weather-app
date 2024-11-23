const MONTHSTR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function toDateDisplayText(dateString: string) {
    const [year, month, day] = dateString.split("-");
    const monthSimple = MONTHSTR[parseInt(month) - 1];

    return `${monthSimple} ${day}, ${year}`;
}