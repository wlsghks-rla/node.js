// setInterval()을 활용해서 1초마다 Math.random()을 활용해서
// 홀수/짝수 나오도록 홀수(성공) / 짝수(실패) => 성공인 경우는 success.txt에 "성공!" 실패인경우는 fail.txt에 "실패"
// 10번만 실행하고 종료.
const { Console } = require("console");
const fs = require("fs");

const output = fs.createWriteStream("./success.txt", { flags: "a" }); // 쓰기용도의 파일 생성. // flags: 'a' 누적
const errOutput = fs.createWriteStream("./fail.txt", { flags: "a" }); // err담는 용도

const logger = new Console({ stdout: output, stderr: errOutput });

function num() {
  let data = Math.ceil(Math.random() * 100);
  console.log(data);
  if (data % 2 == 1) {
    logger.log("성공!");
    console.log(`홀수: ${data}`);
  } else {
    logger.error("실패");
    console.log(`짝수: ${data}`);
  }
}

let start = 1;
let timer = setInterval(() => {
  if (start == 10) {
    clearInterval(timer);
  }
  num();
  start++;
}, 1000);
// clearInterval(timer);

const obj = {
  name: "Hong",
  age: 20,
  friends: [
    { name: "Choi" },
    { name: "Park" },
    { name: "Kim", hobbies: ["reading", "eating"] },
  ],
};
console.log(obj);
console.dir(obj, { depth: 0, colors: true });

// console.time().
console.time("job");

for (let i = 0; i < 100000000; i++) {}

console.timeEnd("job");
