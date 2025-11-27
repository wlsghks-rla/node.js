// 정규 표현식.
const reg = /Hello/gi; //new RegExp('o');

// console.log("Hello, World".replace(reg, "O")); // /o/g
// console.log("Hello, WOrld".replace(reg, "a")); // /o/gi
// console.log(
//   "Hello, WOrld" + //
//     "\nadfadfo" + //
//     "\naodfafd".replace(reg, "a")
// ); // /o/gi
console.log(
  `Hello, WOrld
Hdfadfho
Haodfafd`.replace(reg, "a")
); // /H/gi

// 전화번호 표현식
let phone = "010-2343-9870";
const telReg = /^0\d{1,2}-\d{3,4}-\d{4}$/;
console.log(telReg.test(phone));
