const express = require("express");
const cors = require("cors"); // npm install cors
const mysql = require("mysql2/promise"); // npm install mysql2
const pool = mysql.createPool({
  // db를 사용하기위한 세션설정
  host: "localhost",
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10, // 한번에 접속할 수 있는 pool 갯수
});

const app = express(); // instance 생성
const PORT = 3000;

// 셋업.
app.use(cors());
app.use(express.json()); // 요청정보body : json처리.

app.get("/", (req, res) => {
  // / 는 라우팅 정보.
  // get방식.
  console.log("/ 경로가 호출");
  res.send("/ 호출됨."); // 없으면 계속 로딩.
});

// 조회.
app.get("/boards", async (req, res) => {
  try {
    const result = await pool.query("select * from board");
    console.log(result[0][0]); // [[조회 값],[table에 대한 정보]]
  } catch (err) {
    console.log(err);
  }
  res.send("done"); // error와 상관없이 출력.
});

// 등록.
app.post(
  "/board",
  async (req, res) => {
    console.log(req.body);
    const { id, title, content, author } = req.body;
    // 암호화.

    let result = await pool.execute(
      " insert into board (board_id, title, content, author) values(?,?,?,?)",
      [
        // execute는 promise 반환
        id,
        title,
        content,
        author,
      ]
    );
    console.log(result[0].affectedRows);
    if (result[0].affectedRows == 1) {
      res.send("정상적으로 등록된 글입니다");
    } else {
      res.send("예외발생");
    }
  }
  // end of createCryptoPassword()
);

// 서버실행.
app.listen(PORT, () => {
  console.log(`server running .. http://localhost:${PORT}`);
}); // 서버생성.
