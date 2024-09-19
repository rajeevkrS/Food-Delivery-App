import cron from "cron";
import http from "http";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.BACKEND_URL;

const job = new cron.CronJob("*/14 * * * *", function () {
  const protocol = URL.startsWith("https") ? https : http; // Choose the protocol
  protocol
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log("GET request sent successfully");
      } else {
        console.log("GET request failed", res.statusCode);
      }
    })
    .on("error", (e) => {
      console.error("Error while sending request", e);
    });
});

export default job;
