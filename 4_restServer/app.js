// Express 기반의 서버를 실행하는 진입 파일.
const express = require("express");
const app = express();
const port = 3000;

// 미들웨어(Express에서 사용하는 보조기능) 등록. (라우팅 등록보다 상위 위치)
// HTTP Request, Response를 다룰 수 있는 함수.

// body parser :  사용자가 보낸 정보가 담긴 body를 해석하는 역할. HTTP 객체의 Body에서 데이터를 읽고 쓰는 경우 사용
app.use(express.json()); // application/JSON
app.use(express.urlencoded({ extended: false })); // application/x-www-form-urlencoded => 검색할 때 사용.

// 서버 실행 코드.
app.listen(port, () => {
  console.log("Server start");
  console.log(`http://localhost:${port}`);
});

// 라우팅 등록.
app.get("/", (req, res) => {
  res.send("Wellcome! Rest Server!");
});

// 게시글 라우터 모듈
const boardRouter = require("./routers/boardRouter.js"); // 라우터 모듈은 파일별로 분리하는 역할.
app.use("/", boardRouter);
