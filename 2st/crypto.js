// 암호화
const crypto = require("crypto");

// let password = crypto
//   .createHash("sha512") // 암호화 방식.
//   .update("pw1234") // 암호할 문장.
//   .digest("base64"); // 인코딩 방식.
// .digest("hex"); // 인코딩 방식.
// console.log(password);

async function createCryptoPassword(plainPassword) {
  const salt = await new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      // 비동기처리.
      if (err) {
        // console.log(err);
        reject(err);
        return;
      }
      // 암호화된듯한 구문.
      const salt = buf.toString("base64");
      // console.log(salt);
      resolve(salt);
    }); // end of crypto.randomBytes()
  });

  // 암호화 함수.
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 100000, 64, "sha512", (err2, key) => {
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
} // end of createCryptoPassword()

// createCryptoPassword("pw1234")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch(console.log);

// 아이디/비밀번호 : 회원가입. -> salt 및 암호화된 값 db에 저장.
// 아이디/비밀번호 : 로그인.

// createCryptoPassword("pw1234") //
//   .then(result => console.log(result.salt));
// 비밀번호 vs db 비밀번호 비교(salt 값들 비교.)
async function checkPassword(loginPassword) {
  let { salt, password } = await createCryptoPassword("12345");

  let dbPassword = password;

  let encPassword = await new Promise((resolve, reject) => {
    crypto.pbkdf2(loginPassword, salt, 100000, 64, "sha512", (err2, key) => {
      // console.log(3, salt);
      if (err2) {
        // console.log(`salt를 활용해서 암호화 중 에러=> ${err2}`);
        reject(`salt를 활용해서 암호화 중 에러=> ${err2}`);
        return;
      }
      const cryptoPass = key.toString("base64");
      // console.log(cryptoPass);
      if (cryptoPass === dbPassword) {
        console.log("true");
      } else {
        console.log("false");
      }
    }); // end of pbkdf2()
  });
}

// 평문

// let encPassword = ;
//crypto.pbkdf2 활용해서 비밀번호 생성.

checkPassword("pw1234");
// let check = checkPassword("pw1234");
// console.log(check);
