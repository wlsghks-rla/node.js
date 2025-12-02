// nodemailer 모듈.
const nodemailer = require("nodemailer");

const config = {
  host: "smtp.naver.com",
  port: 465,
  secure: true,
  auth: {
    user: "phsmart7",
    pass: "4KLRH28TX919",
  },
};
const sendEmail = (data) => {
  return new Promise((resolve, reject) => {
    let transport = nodemailer.createTransport(config);
    transport.sendMail(data, (err, info) => {
      // 메일 도착 전 끝나는 것을 방지.
      if (err) {
        reject(err);
        return;
      }
      console.log(info);
      if (info.accepted.length > 0) {
        console.log("done");
        resolve({ receiver: info.accepted[0], msg: "정상 발송됨." });
      } else {
        resolve({ receiver: "없음", msg: "수신자가 없음." });
      }
    });
  });
};

// 파일 첨부.
function sendMailAttachFnc() {
  let transport = nodemailer.createTransport(config);
  transport.sendMail(
    {
      from: "phsmart7@naver.com",
      to: "phsmart7@naver.com",
      subject: "파일첨부테스트",
      text: "파일첨부테스트",
      attachments: [
        {
          filename: "board.xlsx",
          path: "../uploads/board.xlsx",
        },
        {
          filename: "고객명단.xlsx",
          path: "../uploads/고객명단.xlsx",
        },
      ],
    },
    (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("send");
    }
  );
}

sendMailAttachFnc();

module.exports = { sendEmail, config };
