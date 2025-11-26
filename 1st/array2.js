// array2.js
// filter()

let numbers = [];

// 1 ~ 100 임의값.
console.log(Math.ceil(Math.random() * 100));

for (let i = 1; i <= 10; i++) {
  numbers.push(Math.ceil(Math.random() * 100));
}

let result = numbers.filter((elem, idx, ary) => {
  return elem % 2 == 0; // true 반환하는 때 elem을 새로운 배열에 추가.
});
console.log(numbers, result);

// fetch("http://localhost:4000/boards")
//   .then((resp) => resp.json())
//   .then((result) => {
//     let fresult = result.filter((elem) => {
//       return elem.AUTHOR == "user01";
//     });
//     console.log(fresult);
//   });

// 특정 글만 있는 것들만 찾기
// fetch("http://localhost:4000/boards")
//   .then((resp) => resp.json())
//   .then((result) => {
//     let fresult = result.filter((elem) => {
//       // indexOf 함수도 가능
//       return elem.CONTENT.includes("content");
//     });
//     console.log(fresult);
//   });

// map : A -> A' 형태변환
let friends = [
  { firstName: "길동", lastName: "홍", phone: "010-1111" },
  { firstName: "민수", lastName: "김", phone: "010-2222" },
  { firstName: "우석", lastName: "최", phone: "010-3333" },
];
// let mfriends = friends.map((elem) => {
//   // elem만큼 반복
//   let obj = {};
//   obj.name = elem.lastName + " " + elem.firstName;
//   obj.tel = elem.phone;
//   return obj;
// });
let mfriends = friends.map(({ firstName, lastName, phone }) => {
  // elem만큼 반복
  let obj = {};
  obj.name = lastName + " " + firstName;
  obj.tel = phone;
  return obj;
});
console.log(mfriends);
