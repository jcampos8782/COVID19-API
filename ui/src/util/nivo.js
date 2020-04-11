export const formatDateKey = date => {
  let d = new Date(date);

  // Workaround
  // https://github.com/plouc/nivo/issues/911
  d.setDate(d.getDate() + 1);

  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}
