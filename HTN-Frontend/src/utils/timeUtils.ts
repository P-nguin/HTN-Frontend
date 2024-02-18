export const convertUnixTo24HourTime = (unixTimestamp: number): string => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
    // to get date we don't * 1000 since the time is given in ms
    const date = new Date(unixTimestamp);
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
  
    return `${dayOfWeek}, ${month} ${dayOfMonth}, ${formattedTime}`;
};