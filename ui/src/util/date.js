export const SHORT = new Intl.DateTimeFormat('en-US', {weekday: 'short', month: 'short', day: 'numeric'});

export const formatDateString = (date, format = SHORT) => {
  return format.format(date);
}
