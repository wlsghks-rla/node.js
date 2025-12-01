const express = require("express");
const cors = require("cors");
const router = express.Router();
const { pool } = require("../db.js");
const fs = require("fs");
const multer = require("multer");

// 셋업.
router.use(cors());
router.use(express.json({ limit: "100mb" }));

// multer 셋업.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const originalname = //
      Buffer.from(file.originalname, "latin1").toString("utf-8");
    cb(null, Date.now() + "-" + originalname);
  },
});

const upload = multer({ storage: storage });

// 글조회.
router.get("/boards", async (req, res) => {
  try {
    const result = await pool.query("select * from board");
    console.log(result[0]); // [[조회 값],[table에 대한 정보]]
    res.send(result[0]); // error와 상관없이 출력.
  } catch (err) {
    console.log(err);
    return;
  }
});

// 글등록.
// 글등록정보(제목, 내용, 작성자, images(파일명))
// 파일등록(uploads/파일)
router.post("/board", async (req, res) => {
  const contentType = req.headers["content-type"];

  let renameFile = "";
  // multipart/form-data
  if (contentType.includes("multipart/form-data")) {
    // multer 모듈.
    const multerFnc = upload.single("img"); // 미들웨어 함수 반환
    multerFnc(req, res, async (err) => {
      // 비동기함수.
      //err callback.
      if (err) {
        console.log(err);
        res.json({ retCode: "NG", retVal: "업로드 처리중 예외발생." });
      }
      console.log(req.file.filename);
      const { title, content, author } = req.body;
      // db insert.
      let result = await pool.execute(
        " insert into board ( title, content, author, images ) values(?,?,?,?)",
        [
          // execute는 promise 반환

          title,
          content,
          author,
          req.file.filename,
        ]
      );
      console.log(result[0].affectedRows);
      if (result[0].affectedRows == 1) {
        res.send("정상적으로 등록된 글입니다");
      } else {
        res.send("예외발생");
      }
    }); // end of if
  }
  // application/json
  else if (contentType.includes("application/json")) {
    const { title, content, author, filename, base64 } = req.body;
    // uploads에 파일 생성.
    if (filename) {
      try {
        renameFile = Date.now() + "-" + filename;
        fs.writeFileSync(
          "uploads/" + renameFile,
          Buffer.from(base64, "base64")
        );
        console.log(renameFile);
      } catch (err) {
        console.log(err);
      }
    }
    console.log(req.body);
    console.log(filename, base64);

    // db insert.
    let result = await pool.execute(
      " insert into board ( title, content, author, images ) values(?,?,?,?)",
      [
        // execute는 promise 반환

        title,
        content,
        author,
        renameFile,
      ]
    );
    console.log(result[0].affectedRows);
    if (result[0].affectedRows == 1) {
      res.send("정상적으로 등록된 글입니다");
    } else {
      res.send("예외발생");
    }
  } // end of else if
});

// 글 수정.
router.put("/board", async (req, res) => {
  console.log(req.body);
  const { id, content } = req.body;

  let result = await pool.execute(
    `update board
     set    content = ?
     where board_id = ?`,
    [
      // execute는 promise 반환
      content,
      id,
    ]
  );
  console.log(result);
  if (result[0].affectedRows == 1) {
    res.send("정상적으로 수정된 글입니다");
  } else {
    res.send("예외발생");
  }
});

// 글 삭제.
router.delete("/board", async (req, res) => {
  console.log(req.body);
  const { id } = req.body;

  let result = await pool.execute(
    `delete from board
     where board_id = ?`,
    [id]
  );
  if (result[0].affectedRows == 1) {
    res.send("정상적으로 삭제된 글입니다");
  } else {
    res.send("예외발생");
  }
});

module.exports = router;
