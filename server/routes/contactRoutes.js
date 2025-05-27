const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const ContactMessage = require("../models/contactmessage");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Save message to MongoDB
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content to admin
    const mailOptionsAdmin = {
      from: `"Homeschool Hub Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <h3>You've received a new message!</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    // Email content to user (confirmation)
    const mailOptionsUser = {
      from: `"Homeschool Hub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting Homeschool Hub!",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to us. We have received your message:</p>
        <blockquote>${message}</blockquote>
        <p>We will get back to you shortly.</p>
        <p>Best regards,<br/>Homeschool Hub Team</p>
      `,
    };

    // Send email to admin
    await transporter.sendMail(mailOptionsAdmin);

    // Send confirmation email to user
    await transporter.sendMail(mailOptionsUser);

    res.status(200).json({ msg: "Message received, thank you!" });
  } catch (err) {
    console.error("Failed to process contact message:", err);
    res.status(500).json({ msg: "Server error. Try again later." });
  }
});

module.exports = router;
