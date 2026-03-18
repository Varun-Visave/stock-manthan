import cron from "node-cron";
import https from "https";

const BACKEND_URL = "https://stock-manthan-backend.onrender.com/health-check";

/**
 * Sets up a cron job to ping the backend every 12 minutes.
 * This prevents Render's free tier from spinning down due to inactivity.
 */
export function setupCron() {
  console.log("--------------------------------------------------");
  console.log("CRON SERVICE: Setting up backend keep-alive ping...");
  console.log(`CRON SERVICE: Target -> ${BACKEND_URL}`);
  console.log("CRON SERVICE: Frequency -> Every 12 minutes");
  console.log("--------------------------------------------------");

  // Schedule task every 12 minutes
  cron.schedule("*/12 * * * *", () => {
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    console.log(`[${timestamp}] CRON: Sending keep-alive ping to ${BACKEND_URL}`);

    https.get(BACKEND_URL, (res) => {
      const { statusCode } = res;
      if (statusCode === 200) {
        console.log(`[${timestamp}] CRON: Ping successful! (Status: ${statusCode})`);
      } else {
        console.warn(`[${timestamp}] CRON: Ping received non-200 status: ${statusCode}`);
      }
      
      // Consume response data to free up memory
      res.resume();
    }).on("error", (err) => {
      console.error(`[${timestamp}] CRON: Ping failed with error: ${err.message}`);
    });
  });
}

// Allow running as a standalone script
if (process.argv[1]?.includes('cron-service.ts')) {
  setupCron();
}
