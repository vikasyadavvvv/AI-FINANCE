import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { RecurringIntervalEnum } from "../models/transaction.model";
import { ReportFrequencyEnum } from "../models/report-setting.model";

export function calulateNextReportDate(
  lastSentDate?: Date,
  frequency: keyof typeof ReportFrequencyEnum = ReportFrequencyEnum.MONTHLY
): Date {
  const now = new Date();
  const lastSent = lastSentDate || now;

  let nextDate: Date;

  switch (frequency) {
    case ReportFrequencyEnum.DAILY:
      nextDate = startOfDay(addDays(lastSent, 1));
      break;
    case ReportFrequencyEnum.WEEKLY:
      nextDate = startOfWeek(addWeeks(lastSent, 1), { weekStartsOn: 1 });
      break;
    case ReportFrequencyEnum.MONTHLY:
    default:
      nextDate = startOfMonth(addMonths(lastSent, 1));
      break;
  }

  console.log(nextDate, "nextDate");
  return nextDate;
}

export function calculateNextOccurrence(
  date: Date,
  recurringInterval: keyof typeof RecurringIntervalEnum
) {
  const base = new Date(date);
  base.setHours(0, 0, 0, 0);

  switch (recurringInterval) {
    case RecurringIntervalEnum.DAILY:
      return addDays(base, 1);
    case RecurringIntervalEnum.WEEKLY:
      return addWeeks(base, 1);
    case RecurringIntervalEnum.MONTHLY:
      return addMonths(base, 1);
    case RecurringIntervalEnum.YEARLY:
      return addYears(base, 1);
    default:
      return base;
  }
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
