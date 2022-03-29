const nodemailer = require('nodemailer')

const sendEmail = async (destination, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',   
            auth: {
                user: 'uh',
                pass: 'kittenpics'
            }
        });

        const sent = transporter.sendMail({
            from: 'uh',
            to: destination,
            subject: "Panels Password Recovery",
            text: "uh"
        }, (err, data) => {
            if (err) {
                console.error("Password recovery email failed to send: " + err);
            }
            else {
                console.log("Password recovery email successfully sent: " + data);
            }
        })
    }
    catch (err) {
        console.log("Password recovery email failed to send: " + err);
    }
}

module.exports = sendEmail;