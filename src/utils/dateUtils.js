
export const formatTimeWithMeridian = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let meridian = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 !== 0 ? hours % 12 : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${hours}:${minutes} ${meridian}`;
  return formattedTime;
}