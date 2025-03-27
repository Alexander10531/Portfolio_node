import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});


export const sendEmail = async (options: EmailOptions): Promise<void> => {
  console.log(process.env.EMAIL_USER); 
  console.log(process.env.EMAIL_PASS); 
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Se genero un error", error); 
  }
};
