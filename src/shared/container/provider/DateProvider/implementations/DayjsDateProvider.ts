import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import IDateProvider from "../interfaces/IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const endDateUtc = this.convertToUtc(end_date);
    const startDateUtc = this.convertToUtc(start_date);

    return dayjs(endDateUtc).diff(startDateUtc, "hours");
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const endDateUtc = this.convertToUtc(end_date);
    const startDateUtc = this.convertToUtc(start_date);

    return dayjs(endDateUtc).diff(startDateUtc, "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export default DayjsDateProvider;
