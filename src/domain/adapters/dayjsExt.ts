import dayjs from "dayjs";
import "dayjs/locale/es";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

const dayjsExt = dayjs;

dayjs.locale("es");
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export { dayjsExt };
