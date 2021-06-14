const { nextTick } = require('async');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tech.happyclash@gmail.com',
    pass: 'TECHhc@gmail.com'
  }
});

function hcSendMail(data,next){
    var mailOptions = {
        from: 'tech.happyclash@gmail.com',
        to: data.email,
        subject: 'Link for verification',
        text: data.text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          next(error);
        } else {
          console.log('Email sent: ' + info.response);
          next(null,info);
        }
      });
}

module.exports={
    hcSendMail:hcSendMail,
}