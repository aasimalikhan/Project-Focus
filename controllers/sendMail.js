
const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const {
        MAILING_SERVICE_CLIENT_ID,
        MAILING_SERVICE_CLIENT_SECRET,
        MAILING_SERVICE_REFRESH_TOKEN,
        SENDER_EMAIL_ADDRESS,
        SENDER_EMAIL_PASSWORD
} = process.env

const oAuth2Client = new google.auth.OAuth2(
    MAILING_SERVICE_CLIENT_ID, MAILING_SERVICE_CLIENT_SECRET, REDIRECT_URI
)

oAuth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN
})
    
    
    // send mail
const sendEmail = async (to, url, txt) => {
        try {
            const accessToken = await oAuth2Client.getAccessToken()
            const smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'mairafatima54321@gmail.com',
                    clientId: MAILING_SERVICE_CLIENT_ID,
                    clientSecret: MAILING_SERVICE_CLIENT_SECRET,
                    refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
                    accessToken: accessToken
                    
                }
            })
        
            const mailOptions = {
                from: SENDER_EMAIL_ADDRESS,
                to: to,
                subject: "Project Focus",
                html: `
                    <div style="font-family: 'Poppins', sans-serif; background: #363636; max-width: 700px; margin:auto; padding: 50px 20px; font-size: 110%;">
                    <img style="display: block; height: 60px; margin: auto; text-align: center" src="https://res.cloudinary.com/mainstreammedia/image/upload/v1638449967/misc/project_focus_main_sp0sqx.png" />
                    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Project Focus.</h2>
                    <p style="color: white;">You have registered on the Project Focus Website. Please confirm your email to continue using Project Focus
                    </p>
                    
                    <a href=${url} style="background: crimson; border-radius: 12px; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
                
                    <p style="color: white;">If the button doesn't work for any reason, you can also click on the link below:</p>
                
                    <div>${url}</div>
                    </div>
                `
            }
            const result = await smtpTransport.sendMail(mailOptions)
            return result;
        } catch (err) {
            console.log(err)
            return err
        }
        
}
    
module.exports = sendEmail