export const parseDate = oldDate => {
  const [oDate, oTime] = oldDate.split('T');

  return oDate.split('-').reverse().join('.') + ' ' + oTime.split(':').splice(0, 2).join(':');
}

export const microseconds2HoursMinutes = microseconds => {

  return `${Math.floor(microseconds / (1000 * 60 * 60))}ч. ${Math.floor((microseconds / (1000 * 60)) % 60)}мин.`;
}