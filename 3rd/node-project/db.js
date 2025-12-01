const crypto = require("crypto");

// mysql db를 활용.
const mysql = require("mysql2/promise"); // npm install mysql2

const pool = mysql.createPool({
  // db를 사용하기위한 세션설정
  host: "localhost",
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10, // 한번에 접속할 수 있는 pool 갯수
});

// 암호화 함수.
function createEncPassword(pw, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(pw, salt, 100000, 64, "sha512", (err2, key) => {
      // console.log(salt);
      if (err2) {
        // console.log(`salt를 활용해서 암호화 중 에러=> ${err2}`);
        reject(`salt를 활용해서 암호화 중 에러=> ${err2}`);
        return;
      }
      const cryptoPass = key.toString("base64");
      // console.log(cryptoPass);
      resolve({ salt: salt, password: cryptoPass });
    }); // end of pbkdf2()
  });
}

// 모듈. export 활용.
module.exports = { pool, createEncPassword };
