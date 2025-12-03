// Table : board

// 전체조회
const selectAll = `SELECT board_id
        , title
        , content
        , author
        , create_date
FROM board
ORDER BY board_id`;

// 단건 조회.
const selectById = `
SELECT board_id
        , title
        , content
        , author
        , create_date 
FROM board 
WHERE board_id = ?`; // ?에 지금당장 무슨 값이 올지 모른다는 뜻

// 단건 등록.
const insertInfo = `
INSERT INTO board ( title, content, author) 
VALUES ( ?, ?, ?)`;
// 1) ?의 갯수 - 1개면 배열이 굳이 필요x(원래는 배열이 맞음.) 2) ?가 매칭되는 컬럼이 정확한가
/* 참고
FETCH함수에서 MERGE일 경우 사용 확률 
커리에 SET ? 일 경우
{ 'title' : 'Oracle', 'content' : 'SQL 수업'}
 => SET title = 'Oracle', content = 'SQL 수업'
*/

// 게시글 단건 수정.
const putInfo = `
UPDATE board
SET    author = "test",
       content = "test",
       title = "test"
WHERE board_id = ?`;

module.exports = {
  selectAll,
  selectById,
  insertInfo,
  putInfo,
};
