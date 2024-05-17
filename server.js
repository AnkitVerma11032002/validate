const express=require("express")
const app=express()
const user=require("./routes/user.js")
const {connectDB}=require('./db.js')
const bodyParser = require("body-parser")

const otpGenerator = require('otp-generator');
const twilio = require('twilio')

//Middlewares

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))


//connection
connectDB()

// Twilio configuration
const accountSid = 'AC811dc28f532603373504c01a7daca905';
const authToken = '7794750cc6813a626e8bd407013b817b';
const twilioPhoneNumber = '7470524782';
const client = twilio(accountSid, authToken);

const otps={};
// Route to initiate password reset via OTP
app.post('/reset-password', (req, res) => {
    const { mobileNumber } = req.body;

    // Check if mobile number exists in your database
    // If not, return an error
    // Here, I'm assuming a simple check for demonstration purposes
    if (!mobileNumber) {
        return res.status(400).json({ error: 'Mobile number is required.' });
    }

    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    // Store OTP in memory with mobile number as key
    otps[mobileNumber] = otp;

    // Send OTP via SMS
    client.messages.create({
        body: `Your OTP for password reset is: ${otp}`,
        from: twilioPhoneNumber,
        to: mobileNumber
    })
    .then(() => {
        res.status(200).json({ success: true, message: 'OTP sent successfully.' });
    })
    .catch(error => {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP.' });
    });
});



//routes
app.use('/user',user);

app.listen(8001,()=>{console.log("Server Started at prot 8001")})