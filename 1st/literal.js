// literal.js
const { students } = require("./data");
let id = "user01";
let email = "user01@email.com";

console.log(`id는 ${id}, 이메일은 ${email}`);

console.log(`${3 + 2}`); // 연산 가능
console.log(`${3 % 2 == 0 ? "짝수" : "홀수"}`);

console.log(
  `${
    students
      .map((elem) => elem.name)
      .sort() // 배열,
      .join("씨 ") + "씨" // 문자열.
  }씨`
);
