export const getFormattedDate = (date) => {
  return date.toISOString().split('T')[0].split('-').reverse().join('-');
};

export const getDateMinusDays = (date,days) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
};
