exports.sendEmail = function (msg) {
    var nodemailer = require('nodemailer');
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'homeautom144@gmail.com',
        pass: 'Bw330405'
      }
    });
    
    var mailOptions = {
      from: 'homeautom144@gmail.com',
      to: 'litro79@gmail.com',
      subject: 'Sending Email using Node.js',
      text: msg
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

}
