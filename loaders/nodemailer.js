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
      to: `${counseleeEmail}, ${counselorEmail}`,
      subject: "[Anon-Wall] 예약이 확정되었습니다.",
      html: `
        <h3>Anon-Wall을 이용해주셔서 감사합니다.</h3>
        <h3>예약 시간: ${new Date(startDate).toLocaleDateString("kr-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Seoul",
  })}
        </h3>
        </br>
        <p>
          예약 시간에 늦지 않게 입장해주세요 :)
        </p>
        <img src="https://media.giphy.com/media/l2SqiOMQxG82Gto4M/giphy.gif" alt="yay" />
      `,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
