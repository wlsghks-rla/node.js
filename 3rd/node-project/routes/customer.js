const express = require("express");
const cors = require("cors");
const router = express.Router();
const { pool } = require("../db.js");
const { config } = require("../nodemailer/index.js");

const nodemailer = require("nodemailer");
const xlsx = require("xlsx");

router.use(cors());

// db고객정보 -> 엑셀파일 -> 메일첨부발송.
// http:localhost:3000/customer/email_customer
// 발신자, 수신자 customer.xlsx를 첨부 발송.

router.get("/email_customer", async (req, res) => {
  const workbook = xlsx.utils.book_new();
  const result = await pool.query(`select * from customer`);

  console.log(result[0]);
  const json = result[0];

  const firstSheet = xlsx.utils.json_to_sheet(json, {
    header: ["id", "name", "email", "phone"],
  });
  // console.log(firstSheet);
  xlsx.utils.book_append_sheet(workbook, firstSheet, "data");
  xlsx.writeFile(workbook, "./uploads/고객목록.xlsx");

  let transport = nodemailer.createTransport(config);
  transport.sendMail(
    {
      from: "phsmart7@naver.com",
      to: "phsmart7@naver.com",
      subject: "test_file",
      text: "test_file",
      attachments: [
        {
          filename: "고객목록.xlsx",
          path: "./uploads/고객목록.xlsx",
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

  res.send(result);
});

module.exports = router;
