const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// read config: set via firebase functions:config:set mail.user="xxx" mail.pass="yyy"
const MAIL_USER = functions.config().mail?.user;
const MAIL_PASS = functions.config().mail?.pass;
const MAIL_TO = functions.config().mail?.to || "helpjobsure@gmail.com";
const MAIL_SUBJECT = functions.config().mail?.subject || "New Enquiry - JobSure Automation";

if (!MAIL_USER || !MAIL_PASS) {
  console.warn("Mail credentials not configured. Run:\n firebase functions:config:set mail.user=\"you@example.com\" mail.pass=\"APP_PASSWORD\" mail.to=\"helpjobsure@gmail.com\" mail.subject=\"New Enquiry - JobSure Automation\"");
}

exports.sendMail = functions.https.onRequest(async (req, res) => {
  // Only accept POST
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const data = req.body || {};
  const name = data.name || "";
  const email = data.email || "";
  const phone = data.phone || "";
  const course = data.course || "";
  const message = data.message || "";

  const html = `
    <h3>New Enquiry — JobSure Automation</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Course:</strong> ${course}</p>
    <p><strong>Message:</strong><br/>${message}</p>
    <hr/>
    <p>Received: ${new Date().toLocaleString()}</p>
  `;

  try {
    // transporter via SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_USER, pass: MAIL_PASS }
    });

    const mailOptions = {
      from: `"JobSure Website" <${MAIL_USER}>`,
      to: MAIL_TO,
      subject: MAIL_SUBJECT,
      html
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("sendMail error:", err);
    return res.status(500).json({ success: false, error: err.toString() });
  }
});
