const nodeCron = require("node-cron");
const nodemailer = require("nodemailer");
const Client = require("../models/Client");

// Schedule follow-up session and send email notification
const scheduleSession = async (req, res) => {
  const { date, time, sessionType } = req.body;
  const client = await Client.findById(req.params.id);

  if (client) {
    client.sessionDate = date;
    client.sessionTime = time;
    client.sessionType = sessionType;

    // Send email (NodeMailer setup here)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: client.email,
      subject: `New ${sessionType} Scheduled`,
      text: `You have a ${sessionType} scheduled for ${date} at ${time}.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Session scheduled and email sent." });

    // Reminder setup
    nodeCron.schedule("0 0 24 * * *", () => {
      console.log(`Reminder: ${sessionType} with ${client.name} is tomorrow!`);
    });
  } else {
    res.status(404).json({ message: "Client not found" });
  }
};

module.exports = { scheduleSession };
