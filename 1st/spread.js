// spread operator.
const arr1 = [4, 5, 6];
const arr2 = [1, 2, 3];

const arr3 = [...arr1, ...arr2];
console.log(arr3);

console.log(..."hello");

// 중첩 for.
const forAry1 = [];
let num1 = 1;
for (let i = 0; i < 5; i++) {
  forAry1[i] = []; // 배열[i]의 위치에다시 배열 선언.
  for (let j = 0; j < 5; j++) {
    forAry1[i][j] = num1++;
  }
}
console.log(forAry1);

const forAry2 = [];
let num2 = 25;
for (let i = 0; i < 5; i++) {
  forAry2[i] = []; // 배열[i]의 위치에다시 배열 선언.
  for (let j = 0; j < 5; j++) {
    forAry2[i][j] = num2--;
  }
}
console.log(forAry2);

const forAry3 = [];
let num3 = 1;
for (let i = 0; i < 5; i++) {
  forAry2[i] = []; // 배열[i]의 위치에다시 배열 선언.
  console.log(num3);
  for (let j = 0; j < 5; j++) {
    forAry2[i][j] = num3 + i + 5 * j;
  }
}
console.log(forAry2);
