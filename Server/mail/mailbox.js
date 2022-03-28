const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',   
    auth: {
        user: 'uh',
        pass: 'kittenpics'
    }
});

// use below code snippet in necessary settings, export transporter
const mailOptions = {
    from: 'uh',
    to: 'uh',
    subject: 'Uh',
    text: 'uh'
}

transporter.sendMail(mailOptions, function(error, info) {
    if (error)
        console.log(error);
    else
        console.log("email sent")
});

module.exports = transporter;