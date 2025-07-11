const nodemailer = require("nodemailer");
// require("dotenv").config()

const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
    secure: true,
    port: 465
});

module.exports = transport;
