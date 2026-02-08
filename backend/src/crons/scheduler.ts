import cron from "node-cron";
import { processRecurringTransactions } from "./jobs/transaction.job";
import { processReportJob } from "./jobs/report.job";

const scheduleJob = (name: string, time: string, job: Function) => {
  console.log(`Scheduling ${name} at ${time}`);

  return cron.schedule(
    time,
    async () => {
      try {
        await job();
        console.log(`${name} completed`);
      } catch (error) {
        console.log(`${name} failed`, error);
      }
    },
    {
      scheduled: true,
      timezone: "UTC",
    }
  );
};

export const startJobs = () => {
  return [
    scheduleJob("Transactions", "5 0 * * *", processRecurringTransactions),   //5 - In every 5 minutes 
                                                                              //0 - Midnight at 0 Hours
                                                                              // * - every day
                                                                              //* - every month
                                                                              //* - every week  

    // run 2:30am every day to cover daily/weekly/monthly reports
    scheduleJob("Reports", "30 2 * * *", processReportJob),
  ];
};
