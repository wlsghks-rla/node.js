// DB에 접속하는 객체에 대한 정의
const mysql = require("mysql2/promise"); // async await
const sqlList = require("./sqls/boards.js");
// 1) ConnectionPool 셋팅
const pool = mysql.createPool({
  host: `localhost`,
  user: `dev01`,
  password: `dev01`,
  database: `dev`,
  connectionLimit: 5,
});
// 2) 실제 쿼리문을 실행하는 메서드
const query = async (selected, values) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    let exeuteSql = sqlList[selected];
    console.info(selected, exeuteSql); // console.log와 동일
    let result = (await conn.query(exeuteSql, values))[0];
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    // 정상, 에러 상관없이 무조건 작용.
    if (conn) conn.release(); // pool.getConnection();이 있으면 있어야됨.
  }
};

module.exports = { query };
