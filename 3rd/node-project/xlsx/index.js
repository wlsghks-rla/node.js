// xlsx module.
// 엑셀 -> json, cvs, ...
const nodemailer = require("nodemailer");
const xlsx = require("xlsx");
const { pool } = require("../db.js");
const { config } = require("../nodemailer/index.js");

const config = {
  host: "smtp.naver.com",
  port: 465,
  secure: true,
  auth: {
    user: "phsmart7",
    pass: "4KLRH28TX919",
  },
};

function excel_to_db() {
  // 엑셀 -> 시트[0] -> 시트이름 -> 시트활용.
  const workbook = xlsx.readFile("../uploads/고객명단.xlsx");
  const sheetName = workbook.SheetNames[0];
  const firstSheet = workbook.Sheets[sheetName];
  const sheetJson = xlsx.utils.sheet_to_json(firstSheet);

  console.log(sheetJson); // array.

  for (let i = 0; i < sheetJson.length; i++) {
    console.log(
      sheetJson[i]["이름 "],
      sheetJson[i]["이메일"],
      sheetJson[i]["전화번호"]
    );

    pool.execute(`insert into customer set name=?, email=?, phone=?`, [
      sheetJson[i]["이름 "],
      sheetJson[i]["이메일"],
      sheetJson[i]["전화번호"],
    ]);
  }

  console.log("done");
}

async function db_to_excel() {
  // db -> json -> excel.
  const workbook = xlsx.utils.book_new();
  let result = await pool.query(`select * from board`);
  console.log(result[0]); // [{},{},{}]
  const json = result[0];
  const firstSheet = xlsx.utils.json_to_sheet(json, {
    header: ["board_id", "title", "content", "author", "create_date", "images"],
  });
  xlsx.utils.book_append_sheet(workbook, firstSheet, "Board");
  xlsx.writeFile(workbook, "../uploads/board.xlsx");
  console.log("done");
}
// db_to_excel();

async function sendMailAttachFnc() {
  // customer 테이블의 정보 조회 -> customer.xlsx 생성 후 메일발송.\
  // db -> json -> excel.
  const workbook = xlsx.utils.book_new();
  let result = await pool.execute(`select * from customer`);
  console.log(result[0]);
  const json = result[0];
  const firstSheet = xlsx.utils.json_to_sheet(json, {
    header: ["id", "name", "email", "phone"],
  });
  xlsx.utils.book_append_sheet(workbook, firstSheet, "customer");
  xlsx.writeFile(workbook, "../uploads/customer.xlsx");
  console.log("success");

  let transport = nodemailer.createTransport(config);
  transport.sendMail(
    {
      from: "phsmart7@naver.com",
      to: "phsmart7@naver.com",
      subject: "파일첨부테스트",
      text: "파일첨부테스트",
      attachments: [
        {
          filename: "customer.xlsx",
          path: "../uploads/customer.xlsx",
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

module.exports = { sendMailAttachFnc };
