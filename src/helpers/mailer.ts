//domain.com/verifytoken/assaddfdffg better for server compo
//domain.com/verifytoken?token=assaddfdffg better approach if we use cliend compo

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async({email, emailType, userId}: any) => {
    try{
        

        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken, 
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken, 
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        var transport = nodemailer.createTransport({
            // Looking to send emails in production? Check out our Email API/SMTP product!
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS

                //Todo add these credentials in .env file
            }
        });

        const reqType = emailType === "VERIFY" ? "verifyemail" : "forgetpassword";
        const mailOptions = {
            from: 'sudhansh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",

            html: `<p>Click <a href="${process.env.DOMAIN}/${reqType}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}. This link will expire in one hour.</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
    }
    catch(err: any){
        throw new Error(err.message);
    }
}
