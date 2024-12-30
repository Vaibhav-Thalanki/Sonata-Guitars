const nodemailer = require('nodemailer')
const mailgen = require('mailgen')
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service:"Gmail",
    secure:true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.E_PASS
    }
})

const registerEmail = async(userEmail,user)=>{
    try{
        const emailToken = user.generateRegisterToken(); //different token from auth-token
        let mailGenerator = new mailgen({
            theme: "default",
            product:{
                name: "Sonata GUITARS",
                link: process.env.EMAIL_MAIL_URL
            }
        });
        const email = {
            body:{
                name: userEmail,
                intro: 'Welcome to Sonata! We are very excited to have you on board',
                action: {
                    instructions: "To validate your account, please click here",
                    button:{
                        color: '#1a73e8',
                        text: 'Validate',
                        link: `${process.env.EMAIL_MAIL_URL}users/verify?validation=${emailToken}`

                    }
                },
                outro: 'Need help? Just reply to this email and we\'ll help you out!'
            }
        }
        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: "Welcome to Sonata",
            html: emailBody
        }
        await transporter.sendMail(message)
        return true


    }
    catch(err)
    {
        throw err
    }
}

module.exports = {
    registerEmail
}