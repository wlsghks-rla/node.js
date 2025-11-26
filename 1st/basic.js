// var x = 5;

let x = 6; // 중복 가능. (let은 불가.)
const y = 10;
// y = 11; // 상수값은 변경불가.

console.log(`x의 값은 ${x}`);

// 함수선언식.
// function sum(a, b) {
//   return a + b;
// }
// const sum = function(a, b) {
// return a + b;
// }
// 함수표현식.(화살표함수. 함수선언식과 동일 의미)
const sum = (a, b) => {
  return a + b;
};
