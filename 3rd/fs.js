// fs.js
const fs = require("fs");
console.log("start");

// data.txt읽기.
// woman.txt 여학생 정보만 저장.
// 방법1.
// let data = fs.readFileSync("./data.txt", "utf-8");

// let female = data.split("\r\n").reduce((acc, elem) => {
//   console.log(elem, "acc : " + acc);
//   let studData = elem.split(",");
//   if (studData[2] == "여") {
//     acc.push(studData);
//   }
//   return acc;
// }, []);
// fs.writeFile("./women.txt", female.toString(), "utf-8", (err) => {
//   // fs.writeFile("./women.txt", female.join(), "utf-8", (err) => {
//   if (err) {
//     console.log(`err => ${err}`);
//   }
//   console.log("done");
// });

// 방법2.
let data = fs.readFileSync("./data.txt", "utf-8");

let txt = data
  .split("\r\n")
  .filter((elem) => {
    let [id, name, gender, score] = elem.split(",");
    if (gender == "여") {
      return true;
    }
  })
  .join("\r\n");

fs.writeFile("./women.txt", txt, "utf-8", (err) => {
  if (err) {
    console.log(`err => ${err}`);
  }
  console.log("done");
});

console.log("end");

function fileReadFnc() {
  // // 비동기처리(마지막 처리).
  // fs.readFile("./data.txt", "utf8", (err, data) => {
  //   if (err) {
  //     console.log(`err => ${err}`);
  //     return;
  //   }
  //   console.log(data);
  // });

  // 동기처리(end보다 먼저 처리).
  const data = fs.readFileSync("./data.txt", "utf-8");
  console.log(data);
}

function fileWriteFnc() {
  // 비동기 처리.
  // fs.writeFile("./write.txt", "Hello, World", "utf-8", (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log("done");
  // });

  let data = "Nice to meet you";
  // 동기 처리.
  fs.writeFileSync("./write.txt", data, "utf-8");
  console.log("done");
}
