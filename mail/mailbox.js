const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config();

const sendEmail = async (destination, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',       
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const sent = transporter.sendMail({
            from: process.env.EMAIL,
            to: destination,
            subject: subject,
            text: text
        }, (err, data) => {
            if (err) {
                console.error("Email failed to send: " + err);
            }
            else {
                console.log("Email successfully sent: " + data);
            }
        })
    }
    catch (err) {
        console.log("Email failed to send: " + err);
    }
}

module.exports = sendEmail;