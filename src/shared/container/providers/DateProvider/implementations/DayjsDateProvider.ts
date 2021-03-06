import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertUTC(end_date);
    const start_date_utc = this.convertUTC(start_date);
    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }
  
  convertUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider }