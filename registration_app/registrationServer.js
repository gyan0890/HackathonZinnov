var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var otpActions = require('./OtpActions');
var mail = require('./email');
var otp;
var email;
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/views/" + "homepage.html" );
 })

app.post('/submit', function (req, res) { 
    console.log(req.body);
    if (otpActions.validateAadhar(req.body.aadhar_number)){
        email = req.body.email_id;
        otp = otpActions.createOTP();
        var mailOptions = {
            from: 'dummyforpytesting@gmail.com',
            to: email,
            subject: "OTP for authentication",
            text: "OTP for your transaction is :"+otp
        };

        mail.sendEmail(mailOptions);
        res.sendFile( __dirname + "/views/" + "otp.html" );
    }
})
app.post('/otp', function (req, res) {
    if (otpActions.validateAadhar(req.body.otp)){
        if(otp==req.body.otp){
            res.sendFile( __dirname + "/views/" + "actions.html" );
        }
    }
})

app.post('/sellProperty', function (req, res) { 
        res.sendFile( __dirname + "/views/" + "propertydetails.html" );
})

app.post('/buyProperty', function (req, res) { 
    res.sendFile( __dirname + "/views/" + "buyProperty.html" );
})

app.post('/prepareSaleDeed', function (req, res) { 
    res.sendFile( __dirname + "/views/" + "prepareSaleDeed.html" );
})

app.post('/completeRegistration', function (req, res) { 
    res.sendFile( __dirname + "/views/" + "completeRegistration.html" );
})
const port = process.env.port || 1000 ;
app.listen( port, () => console.log("server listening", port));