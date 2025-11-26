// todo.js p.96
const fs = require("fs");

console.log("start");

fs.readFile("./data.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.split("\r\n")); // 문자열 -> 배열
  let students = data.split("\r\n").reduce((acc, elem, idx, ary) => {
    let studData = { elem };
    console.log(idx, studData, acc);
    if (elem.includes("남")) {
      acc.push({ elem });
    }
    return acc;
  }, []);
  console.log(students);

  let studData = students.map(elem => {
    console.log(elem);
    let obj = {};
    obj.id = elem.elem[0];
    obj.name = elem.elem[2] + elem.elem[3] + elem.elem[4];
    obj.gender = elem.elem[6];
    obj.score = elem.elem[8] + elem.elem[9];
    return obj;
  });
  console.log(studData);
});
// 남학생들만 모아서 출력하기.
//[{id: 1, name: '홍길동', gender: '남', score: 60}]
//[{id: 3, name: '이준호', gender: '남', score: 74}]

console.log("end");
