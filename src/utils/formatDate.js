export default function formatDate()
{
    const date = new Date();
    const day = date.getDate().toString().padStart(2, 0);
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const year = date.getFullYear().toString().padStart(2, 0);
    const hour = date.getHours().toString().padStart(2, 0);
    const min = date.getMinutes().toString().padStart(2, 0);
    const sec = date.getSeconds().toString().padStart(2, 0);
    return `${day}:${month}:${year} - ${hour}:${min}:${sec}`;
}