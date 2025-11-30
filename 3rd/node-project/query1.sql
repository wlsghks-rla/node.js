use dev; -- 사용할 db 선택.
show tables;

create table users (
  user_id varchar(20) not null,
  user_pw varchar(100) not null,
  salt    varchar(100) not null,
  user_nm varchar(50) not null,
  primary key (user_id)
);

select * from users;
insert into users values ( 'user01', '1111', '1111', '홍길동' );
insert into users set user_id='user02'
					 ,user_pw='2222'
                     ,salt='2222'
                     ,user_nm='김민수';
                     
update users
set    user_pw='23434dfsdakf1'
	  ,salt='adjflakjdflj'
where user_id = 'user02';

delete from users where user_id = 'user02';

create table board (
  board_id int(20) not null,
  title varchar(100) not null,
  content    varchar(100) not null,
  author varchar(50) not null,
  create_date timestamp default current_timestamp on update current_timestamp, 
  primary key (board_id)
);
select * from board;
drop table board;

insert into board (board_id, title, content, author) values(1, '1번 제목입니다', '1번 내용입니다', 'user01'); 