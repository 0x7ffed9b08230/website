import axios from "axios";
import nodemailer from "nodemailer";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  from: `"Website Contact" <${process.env.EMAIL_USER}>`,
});

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

export default defineEventHandler(async (event) => {
  try {
    // Check the host header to prevent abuse
    if (event.headers.get("host") !== process.env.EMAIL_HOST) {
      return {
        status: 403,
        message: "Forbidden",
        code: "FORBIDDEN",
      };
    }
    const body = await readBody(event);
    const { email, subject, message, recaptchaToken } = body;

    // Validate required fields
    if (!email || !subject || !message || !recaptchaToken) {
      return {
        status: 400,
        message: "Missing required fields",
        code: "MISSING_FIELDS",
      };
    }

    // Verify reCAPTCHA token
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET,
          response: recaptchaToken,
        },
      }
    );

    if (!recaptchaResponse.data.success) {
      return {
        status: 400,
        message: "Recaptcha verification failed",
        code: "RECAPTCHA_FAILED",
      };
    }

    // Define mail options
    const mailOptionsMain = {
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New message from ${email}: ${subject}`,
      text: message,
    };

    const mailOptionsAutoReply = {
        from: `"Website Contact" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank you for reaching out!",
        text: "I have received your message and will get back to you shortly.",
    }

    // Send email
    await transporter.sendMail(mailOptionsMain);
    await transporter.sendMail(mailOptionsAutoReply);

    return {
      status: 200,
      message: "Email sent successfully",
      code: "EMAIL_SENT",
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occurred while sending the email",
      error: (error as Error).message,
      code: "EMAIL_ERROR",
    };
  }
});
