const nodemailer = require("nodemailer");

exports.sendMail = async ({ counseleeEmail, counselorEmail, startDate }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Anon-Wall" <${process.env.NODEMAILER_USER}>`,
      to: `${counseleeEmail} ${counselorEmail}`,
      subject: "[Anon-Wall] 예약이 확정되었습니다.",
      html: `<b>${new Date(startDate).toLocaleDateString("kr-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Seoul",
      })}</b>`,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
