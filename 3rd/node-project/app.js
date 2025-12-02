const express = require("express");
const fs = require("fs"); // data.txt를 읽기 위해.
const cors = require("cors"); // npm install cors
const { sendEmail } = require("./nodemailer/index");
const { pool } = require("./db.js");
const path = require("path");

const userRoute = require("./routes/users"); // 회원정보.
const boardRoute = require("./routes/board"); // 게시글정보.
const customerRoute = require("./routes/customer");

const app = express(); // instance 생성
const PORT = 3000;

// 셋업.
app.use(cors());
app.use(express.json({ limit: "100mb" })); // 요청정보body : json처리.

app.use("/user", userRoute); // http://localhost:3000/user/users
app.use("/board", boardRoute); // http://localhost:3000/board/board
app.use("/customer", customerRoute);

app.use(express.static("public")); // p.127
app.use(express.static("uploads")); // p.127

// 라우팅. http://localhost:3000/->url 호출하면 실행될 함수.
// 요청방식 + 리소스 => 처리될 정보.
app.get("/", (req, res) => {
  // / 는 라우팅 정보.
  // get방식.
  console.log("/ 경로가 호출");
  res.send("/ 호출됨."); // 없으면 계속 로딩.
});

app.get("/index", (req, res) => {
  fs.readFile("./data.txt", "utf-8", (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    let html = data //
      .split("\r\n")
      .reduce((acc, elem) => {
        acc += "<li>" + elem + "</li>";
        return acc;
      }, "<ul>");
    res.send(html + "</ul>"); // send안의 정보 출력.
  });
});

app.get("/callApi", async (req, res) => {
  let url = `https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=9a34b85611a37fd6ae943f38184d77fa4a5699e47252cc9c8d8fba22e29a1779`;
  let result = await fetch(url); // fetch는 프로미스 반환. -> await 사용가능
  let data = await result.json();
  console.log(data.data.length);
  // center 테이블에 입력하는 처리.
  //3(교수님)
  await pool.execute("delete from center");
  const centerAry = data.data;
  const values = centerAry
    .map(
      ({ id, centerName, address, phoneNumber, sido }) =>
        `(${id}, ${centerName}, ${address}, ${phoneNumber}, ${sido})`
    )
    .join(",");

  await pool.execute(
    `insert into center(id, center_name, address, phone_number, sido)
      values ${values}`
  );

  //2
  // for (let i = 0; i < data.data.length; i++) {
  //   console.log(data.data[i]);
  //   pool.execute(`insert into center values(?,?,?,?,?)`, [
  //     data.data[i].id,
  //     data.data[i].centerName,
  //     data.data[i].address,
  //     data.data[i].phoneNumber,
  //     data.data[i].sido,
  //   ]);
  // }

  // 1
  // let inform = data.data;
  // inform.forEach((elem) => {
  //   console.log(elem);
  //   let { id, centerName, address, phoneNumber, sido } = elem;
  //   pool.execute(`insert into center values(?, ?, ?, ?, ?)`, [
  //     id,
  //     centerName,
  //     address,
  //     phoneNumber,
  //     sido,
  //   ]);
  // });

  res.send("ok");
});

app.post("/email", async (req, res) => {
  const data = req.body;
  console.log(data); // {from:..., to:..., subject:..., text:...}
  if (!data) {
    res.json({ retCode: "NG", retMsg: "입력된 값 확인!" });
    return;
  }
  const result = await sendEmail(data);
  res.json({ retCode: "OK", retMsg: result });
});

app.get("/image/:filename", async (req, res) => {
  const { filename } = req.params;
  // uploads/filename.
  let filepath = path.join(__dirname, "/uploads", filename);
  console.log(filepath);
  res.sendFile(filepath); // 경로를 넣으면 파일로 반환.
});

// 서버실행.
app.listen(PORT, () => {
  console.log(`server running .. http://localhost:${PORT}`);
}); // 서버생성.
