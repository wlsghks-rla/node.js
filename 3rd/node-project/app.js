const express = require("express");
const fs = require("fs"); // data.txt를 읽기 위해.
const cors = require("cors"); // npm install cors

const userRoute = require("./routes/users"); // 회원정보.
const boardRoute = require("./routes/board"); // 게시글정보.

const app = express(); // instance 생성
const PORT = 3000;

// 셋업.
app.use(cors());
app.use(express.json({ limit: "100mb" })); // 요청정보body : json처리.

app.use("/user", userRoute); // http://localhost:3000/user/users
app.use("/board", boardRoute); // http://localhost:3000/board/board

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

// 서버실행.
app.listen(PORT, () => {
  console.log(`server running .. http://localhost:${PORT}`);
}); // 서버생성.
