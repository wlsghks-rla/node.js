// array3.js
// reduce() : 매개변수(1, 2, 3, 4)
// reduce(acc, elem, idx, ary)

let numbers = [30, 20, 50, 60, 10, 70];
//요소들의 합
/*let result = numbers.reduce((acc, elem, idx, ary) => {
  console.log(idx + "=>", acc, elem);
  return acc + elem;
}, 0); // acc 초기값 0
console.log(result);*/

// 최댓값 반환(최소도 가능)
/*let result = numbers.reduce((acc, elem, idx, ary) => {
  console.log(idx + "=>", acc, elem);
  if (acc > elem) {
    return acc;
  } else {
    return elem;
  }
  return acc > elem ? acc : elem;
}, 0); // acc 초기값 0
console.log(result);*/

//50보다 큰 값 새로운 배열(filter)
let result = numbers.reduce((acc, elem, idx, ary) => {
  console.log(idx + "=>", acc, elem);
  if (elem >= 50) {
    acc.push(elem);
  }
  return acc;
}, []); // acc 초기값 0
// console.log(result);

fetch("http://localhost:4000/boards")
  .then((resp) => resp.json())
  .then((result) => {
    let fresult = result.reduce((acc, elem) => {
      // 요소만큼 반복
      if (elem.AUTHOR == "user01") {
        acc.push(elem);
      }
      return acc;
    }, []); // acc 초기값 []
    console.log(fresult);
  });
