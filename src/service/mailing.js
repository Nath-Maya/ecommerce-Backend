import { createTransport } from "nodemailer";
import config from "../config/config.js";

const EMAIL = config.email;
const EMAIL_PASSWORD = config.emailPassword;

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

const sendEmail = async (ticket) => {
  console.log("Si envio " + EMAIL);
  try {
    const userEmail = ticket.purchaser.email;
    const orderCode = ticket.code;
    const orderAmount = ticket.amount;

    const emailContent = {
      from: EMAIL,
      to: "natha.maya.ramirez93@gmail.com", //`${userEmail}`,
      subject: "Thanks for your order",
      html: `<div>
				<p>Your order was processed</p>
				<p>Order code: ${orderCode}</p>
				<p>Total: $${orderAmount}</p>
			</div>
			`,
    };
    console.log(emailContent);
    await transporter.sendMail(emailContent);
  } catch (error) {
    return `${error}`;
  }
};

export default sendEmail;
