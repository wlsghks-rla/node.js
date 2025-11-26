// array4.js
const { students } = require("./data.js"); // import

// reduce를 활용해서 gender가 여자인 새로운 배열 studArray 추가
/*let studArray = students.reduce((acc, elem, idx, ary) => {
  console.log(acc, elem);
  if (elem.gender == "여") {
    acc.push(elem);
  }
  return acc;
}, []);

console.log(studArray);*/

// 남자, 여자 구분
/*let studArray = students.reduce(
  (acc, elem, idx, ary) => {
    console.log(idx, acc.male, acc.female);
    if (elem.gender == "남") {
      acc.male.push(elem);
    } else {
      acc.female.push(elem);
    }
    return acc;
  },
  { male: [], female: [] }
);
console.log(studArray);*/

// 반별 구분(반의 갯수 알 때)
/*let studArray = students.reduce(
  (acc, elem, idx, ary) => {
    console.log(idx, acc);
    if (elem.class.includes("A")) {
      acc.A.push(elem);
    } else if (elem.class.includes("B")) {
      acc.B.push(elem);
    } else if (elem.class.includes("C")) {
      acc.C.push(elem);
    }
    return acc;
  },
  { A: [], B: [], C: [] }
);*/

/*let studArray = students.reduce(
  (acc, elem, idx, ary) => {
    console.log(idx, acc, elem);
    if (elem.class.indexOf("1-A") == 0) {
      acc.A.push(elem);
    } else if (elem.class.indexOf("1-B") == 0) {
      acc.B.push(elem);
    } else if (elem.class.indexOf("1-C") == 0) {
      acc.C.push(elem);
    }
    return acc;
  },
  { A: [], B: [], C: [] }
);
console.log(studArray);*/

// 반별 구분 (갯수 모를 때)
let studArray = students.reduce((acc, elem, idx, ary) => {
  console.log(idx, acc, acc[elem["class"]]);
  if (acc[elem["class"]] == undefined) {
    acc[elem["class"]] = [];
  }
  acc[elem["class"]].push(elem.name);

  return acc;
}, {});
console.log(studArray);
