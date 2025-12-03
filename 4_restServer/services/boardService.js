// 순수 기능에 대한 정의 => 함수(function)
const mysql = require("../database/mapper.js");

// 게시글 전체 목록
const findAll = async () => {
  let list = await mysql.query("selectAll");
  return list;
};

// 게시글 단건 정보: selectById, 필수값(숫자 1개) => board_id
const findByBoardId = async boardId => {
  let info = (await mysql.query("selectById", boardId))[0];
  return info; // 반드시 단건으로 반환.
};

// 게시글 단건 등록: insertInfo, 필요값(title, content, author) => 필수값 title
const addInfo = async boardInfo => {
  let { title, content, author } = boardInfo;
  if (title == null || title == undefined) {
    return { status: "error", message: "title not found" };
  }
  let result = await mysql.query("insertInfo", [title, content, author]);
  let resObj = {};
  if (result.insertId > 0) {
    // insertId : autoIncreasement 일때
    resObj = { status: "sucess", boardId: result.insertId };
  } else {
    resObj = { status: "fail" };
  }
  return resObj;
};

// 게시글 단건 수정: putInfo, 필요값(title, content, author)
const updateInfo = async boardInfo => {
  let { title, author, content, bId } = boardInfo;
  let result = await mysql.query("putInfo", [title, author, content, bId]);
  return result;
};

// 게시글 단건 삭제: deleteInfo, 필수값 board_id
const delInfo = async boardId => {
  let result = mysql.query("deleteInfo", boardId);
  return result;
};

module.exports = {
  findAll,
  findByBoardId,
  addInfo,
  updateInfo,
  delInfo,
};
