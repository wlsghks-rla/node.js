// module.js
const { promiseCall } = require("./promise.js"); // import
const fs = require("fs");

// fs.readFile("./class.js", "utf-8", (err, data) => {
//   // 비동기 함수. ./class.js 실행 후 다른 함수 진행.
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data);
// });
// console.log("end of prog."); // 1번

const data = fs.readFileSync("./class.js", "utf-8"); // 동기방식(순차적으로실행). 1번
console.log(data); // 2번

console.log("end of prog."); // 3번
