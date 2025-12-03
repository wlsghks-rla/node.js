// 라우터 모듈 => 스스로 서버를 실행할 수 없음
const express = require("express");
const router = express.Router();

// route: 사용자가 정해진 엔드포인트(uri + method)에 접속할 경우 어떤 서비스를 어떤 형태로 제공할 건지 정의하는 것
const boardServie = require("../services/boardService.js");

// 게시글 전체조회 : boards + GET
router.get(`/boards`, async (req, res) => {
  // db, ajax, file => 서버 밖에 있는 것들은 무조건 await, async 필수.
  // 해당 경로로 접속햇을 때 제공하는 서비스 : 게시글의 전체 목록
  let list = await boardServie.findAll();
  res.send(list);
});

// 게시글 단건조회 : boards/:bno + GET
router.get(`/boards/:bno`, async (req, res) => {
  // /:bno => params 또는 pathVariable이라고 부름.(/를 통해 값을 넘기는 방식)
  //                                                원래는 ? 기점으로 엔드포인트와 key = value 값 구분 => Query String(질의 문자열).
  const bId = req.params.bno;
  let info = await boardServie.findByBoardId(bId);
  res.send(info);
});

// 게시글 단건 등록 : boards + POST
router.post(`/boards`, async (req, res) => {
  const info = req.body; // method 가 post , put일경우 무조건 body. => get과 post의 차이.
  // get은 정보를 누구나 볼 수 있다(ex 옆서..) post 내용은 확인 불가(body)
  console.log(req.body);
  let result = await boardServie.addInfo(info);
  res.send(result);
});

// 게시글 단건 수정 : boards/:bno + PUT
router.put(`/boards/:bno`, async (req, res) => {
  const bId = req.params.bno;
  let { author, content, title } = req.body;
  let info = { author, content, title, bId };
  console.log(info);
  let result = await boardServie.updateInfo(info);
  res.send(result);
});

// 게시글 단건 삭제 : boards/:bno + DELETE
router.delete(`/boards/:bno`, async (req, res) => {
  const bId = req.params.bno;
  let result = await boardServie.delInfo(bId);
  res.send(result);
});

module.exports = router; // 파일의 마지막 코드(필수!)
