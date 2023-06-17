import { format } from "date-fns";
import { es } from "date-fns/locale";

const normalizeDate = (date: string | Date) => {
  const d = new Date(date);
  d.setUTCHours(d.getUTCHours() - 6);
  return d.toISOString();
  // return format(d, "yyyy-MM-dd hh:mm:ss", {
  //   locale: es,
  // });
};

export default normalizeDate;
