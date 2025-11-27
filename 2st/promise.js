// promise.js 함수를 매개값으로 받음.
// 변수 => +2 => *3 => -5 => result.

function backupFnc() {
  // promise 객체의 상태 => fulfilled, rejected, pending

  // 동기방식.
  // let x = 20;
  // x += 2;
  // x *= 3;
  // x -= 5;

  //  console.log(`결과 => ${x}`);

  // 비동기방식.
  let x = 10;
  // setTimeout(() => {
  //   x += 2;
  // }, 1500);

  // setTimeout(() => {
  //   x *= 3;
  // }, 1000);

  // setTimeout(() => {
  //   x -= 5;
  // }, 500);

  // console.log(`결과 => ${x}`); // 결과가 10나옴.
  // async/ await 방식.

  //promise().
  const promise = new Promise((resolve, reject) => {
    console.log("welcome");
    if (Math.ceil(Math.random() * 10) % 2 == 0) {
      resolve("ok");
    } else {
      reject("fail");
    }
  });

  promise //
    .then((result) => {
      console.log(`result => ${result}`);
    })
    .catch((err) => {
      console.log(`err => ${err}`);
    });
} // 호출 안하기.

async function promiseCall() {
  let x = 10;
  try {
    x = await new Promise((resolve, reject) => {
      setTimeout(() => {
        x += 2;
        resolve(x);
      }, 1500);
    });

    x = await new Promise((resolve, reject) => {
      setTimeout(() => {
        x *= 3;
        resolve(x);
      }, 1000);
    });

    x = await new Promise((resolve, reject) => {
      setTimeout(() => {
        x -= 5;
        resolve(x);
      }, 500);
    });

    console.log(`결과 => ${x}`);
  } catch (err) {
    console.log(`err => `, err);
  }
}
// promiseCall();

module.exports = {
  promiseCall,
  backupFnc,
};
