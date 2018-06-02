var nodemailer= require('nodemailer'); 
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dummyforpytesting@gmail.com',
    pass: 'Hello@123'
  }
})
module.exports ={
    sendEmail:function(mailOptions){
 transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
}
