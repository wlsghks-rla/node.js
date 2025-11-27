// process
const process = require("process");

console.time("job");

let times = 1;
const job = setInterval(() => {
  console.log(`times => ${times}`);
  times++;
  if (times == 3) {
    clearInterval(job);
  }
  process.exit(); // 강제 종료
}, 1000);

process.on("beforeExit", () => {
  console.log("berforExit event call");
  console.log(process.env.path.split(";"));
});

process.on("exit", () => {
  console.log("Exit event call");
  console.timeEnd("job");
});
