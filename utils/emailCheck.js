const nodemailer = require("nodemailer");
require("dotenv").config();

// This will be exported as the verification code
let code = "";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_GMAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.MY_GMAIL,
    to: "nmcanall@citadel.edu",
    subject: "Movie-Finder Email Verification",
    text: `Thanks for signing up for Movie-Finder!  Use the code ${generateCode()} to validate your email.`
}

transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        console.log(error);
    }
    else {
        console.log(console.log("Email sent: " + info.response));
    }
});

// Helper function to generate a validation code
function generateCode() {
    const length = 6;

    // Character choices
    var uppercase = "ABCDEFGHIJKLMNOPQRSTUBWXYZ";
    var numeric = "1234567890";

    while(code.length < length) {
        type = getRandomInt(2); // Returns 0 or 1
    
        // Pick an uppercase letter
        if(type === 0) {
            code += uppercase[getRandomInt(uppercase.length)];
        }
    
        // Pick a number
        else 
            code += numeric[getRandomInt(numeric.length)];
        }
    return code;
}

// Return random integer
function getRandomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max)));
}

module.exports = code;