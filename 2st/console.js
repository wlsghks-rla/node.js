// console 모듈
const { Console } = require("console"); // 내장모듈이여서 생략 가능.
const fs = require("fs");

const output = fs.createWriteStream("./stdout.txt", { flags: "a" }); // 쓰기용도의 파일 생성. // flags: 'a' 누적
const errOutput = fs.createWriteStream("./stderr.txt", { flags: "a" }); // err담는 용도

const logger = new Console({ stdout: output, stderr: errOutput });
logger.log("log출력");
logger.error("error 출력");

console.log("hello");
console.error("에러발생");

const arr = [
  { name: "Jhon Doe", email: "Jhon@email.com" },
  { name: "Jeremy Go", email: "Jeremy@email.com" },
];
console.table(arr);
