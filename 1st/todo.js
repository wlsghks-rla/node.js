// todo.js p.96
const fs = require("fs");

// console.log("start");

fs.readFile("./data.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("1", data); // 문자열 -> 배열
  console.log("2", data.split()); // 문자열 -> 배열
  console.log("3", data.split("\r\n")); // 문자열 -> 배열
  let students;
  students = data.split("\r\n").reduce((acc, elem) => {
    console.log(elem);
    console.log(elem.split());
    console.log(elem.split(","));
    let [id, name, gender, score] = elem.split(",");
    console.log(`id = ${id}`);

    if (gender == "남") {
      acc.push({ id, name, gender, score });
    }
    return acc;
  }, []); // 남학생들만 모아서 출력하기.
  //[{id: 1, name: '홍길동', gender: '남', score: 60}
  //{id: 3, name: '이준호', gender: '남', score: 74}]
  console.log(students);
});
