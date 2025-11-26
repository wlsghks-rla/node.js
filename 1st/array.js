// array.js
// sort() 함수.

let fruits = ["apple", "Mango", "Banana", "Orange"];
fruits.sort(); // 대소문자 구분. 가나다 형식

console.log(fruits);

let numbers = [23, 17, 1, 10, 54, 100];
numbers.sort(function (a, b) {
  console.log(a, b);
  if (a - b < 0) {
    // a < b
    return -1; // 음수값을 반환.
  } else {
    return 1;
  }
});
console.log(numbers);

console.log("홍씨" < "박씨");

let members = [
  { name: "홍씨;", point: 100 },
  { name: "박씨;", point: 150 },
  { name: "김씨;", point: 200 },
];
console.log(members[0].name);
// members.sort((a, b) => {
//   if (a.name < b.name) {
//     return -1;
//   } else {
//     return 1;
//   }
// });
members.sort((a, b) => {
  a.name < b.name ? 1 : -1;
});
console.log(members);

let member = [
  { id: 1, title: "1번 제목입니다", author: "홍길동" },
  { id: 2, title: "2번 제목입니다", author: "최충식" },
  { id: 3, title: "3번 제목입니다", author: "권오식" },
];
member.sort((a, b) => {
  if (a.id < b.id) {
    return 1;
  } else {
    return -1;
  }
});
console.log(member);

fetch("http://localhost:3000/posts")
  .then((resp) => resp.json)
  .then((result) => console.log(result));
