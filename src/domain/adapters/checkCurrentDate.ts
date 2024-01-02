export const chechCurrentDate = (date: Date) => {
  const currentDate = new Date();

  return (
    date.getDay() === currentDate.getDay() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
};
