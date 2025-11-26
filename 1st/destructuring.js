// destructuring.js
const obj = {
  firstName: "Jhon",
  lastName: "Doe",
  age: 37,
  email: "john@gmail.com",
};

const { firstName: fn, lastName: ln, age, email } = obj;
console.log(`firstName: ${fn}, lastName: ${ln}, age: ${age}, email: ${email}`);

const scores = [20, 50, 30, 40, 70];
const [c, z, ...f] = scores;
console.log(c, z, f);

// default function 매개값의 초기값.
// function say(message) {
//   if (message == undefined) {
//     console.log("파라미터가 전달x");
//   } else console.log(message);
// }

// say();

function say(message = "파라미터가 전달x") {
  console.log(message);
}

say("전달");
// 1. arguments 객체 활용
/*function sum(a = 0, b = 0) {
  console.log(arguments); // arguments: 함수의 매개변수를 처리하는 객체.
  let result = 0;
  for (let prop in arguments) {
    result += arguments[prop];
  }
  return result;
}
console.log(sum(1, 2, 3, 4)); // 자바스크립트는 매개변수 상관없이 호출된다.
*/

// 2. rest parameter.
function sum(...args) {
  console.log(args); //
  let result = 0;
  for (let i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}
console.log(sum(1, 2, 3, 4)); // 자바스크립트는 매개변수 상관없이 호출된다.
