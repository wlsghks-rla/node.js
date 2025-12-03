REST API

1. URI : 자원 / METHOD : 기능

- 게시글 전체조회 boardList : get | boards : get
- 단건 조회 boardInfo : get | boards/bno : get
- 게시글 등록 boardINsert : post | boards : post
- 게시글 수정 boardUpdate : post | boards/bon : put
- 게시글 삭제 boardDelete : get /단건조회(여러건은 post) | boards/bno : delete

2. AJAX - FETCH() -> 비동기 방식으로 데이터를 주고받는 통신
   순수하게 데이터만 받음. => 화면(View)를 제공하지 않음.

3. JSON : 데이터 포맷.
   3-1) 객체 형태 {}
   3-2) 배열 형태 []

# 게시판 REST Sever

: 3계층 구조(3-tier Architecture) + MVC2
Presentation Layer : 사용자와 상호작용 ( Router(서버의 로비) + View)
Business Layer : 순수 기능(서비스) // 개발자한테는 제일 중요.
Persistence(영속성) Layer : Mapper(DB)
