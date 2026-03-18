import { sendContactEmail, transporter } from "./server/email.js";

async function testMail() {
  console.log("Checking transporter...");
  try {
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) reject(error);
        else resolve(success);
      });
    });
    console.log("Transporter successful.");
    console.log("Sending email...");
    const sent = await sendContactEmail("Test User", "test@example.com", "12345", "Testing from local script");
    console.log("Mail sent:", sent);
  } catch (err) {
    console.error("Failed to verify/send:", err);
  }
}

testMail();
