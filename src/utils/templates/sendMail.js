const nodemailer = require("nodemailer");
const fs = require('fs')
const handlebars = require('handlebars');
const config = require("../../config");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "farmasi.lyb@gmail.com",
      //pass: "Farmasi.lyb.2023",
      pass :"gbvuhloiwscqtlyv"

    },
  });

const sendEmail = (email,ccList,bccList, subject, templateName, content = {},articles) => {
    return new Promise( async (resolve, reject) => {
        try {
            fs.readFile(__dirname + "/" + templateName + ".html", {encoding: 'utf-8'}, (error, html) => {
                if (error) {
                  reject({ message: error.message });
                  return;
                }
                let template = handlebars.compile(html)
                //let emailContent = { ...content, year: new Date().getFullYear() }
                let emailContent = { 
                    emailBody: content, 
                    articles: articles,
                    year: new Date().getFullYear() 
                  }
                let htmlToSend = template(emailContent)
                const mailOptions = {
                    from: 'farmasi.lyb@gmail.com',
                    to: email, 
                    subject: subject,
                    html: htmlToSend,
                    cc:ccList,
                    bcc:bccList
                };
            
                transporter.sendMail(mailOptions, function (err, info) {
                    if(err) {
                        console.log(err);
                        reject(err)
                        return err
                    }
                    else
                        resolve(true)
                })
                resolve(true)
                return
            });
        } catch (error) {
            reject ({ message: error.message })
        }
    })
}


module.exports = sendEmail;