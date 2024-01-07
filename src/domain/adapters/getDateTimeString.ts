import dayjs from "dayjs";

const getDateTimeString = (
  date: string | number | Date | dayjs.Dayjs | null | undefined
) => dayjs(date).format("DD [de] MMMM [de] YYYY [-] HH:mm");

export default getDateTimeString;
