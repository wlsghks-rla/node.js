create user 'dev01'@'%' identified with mysql_native_password by 'dev01';

grant all privileges on dev.* to 'dev01'@'%' with grant option;
flush privileges;


use dev;

show tables; -- 사용할 db 선택.
select * from customers;

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

update users
set    user_nm = ''
where user_id = '';

create table board (
  board_iduse dev;

show tables; -- 사용할 db 선택.
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

update users
set    user_nm = ''
where user_id = '';

create table board (
  board_id int(20) not null auto_increment,
  title varchar(100) not null,
  content    varchar(100) not null,
  author varchar(50) not null,
  create_date timestamp default current_timestamp on update current_timestamp, 
  primary key (board_id)
);
select * from board ;
SELECT * FROM board WHERE board_id = 1;
drop table board;

insert into board (board_id, title, content, author) values(1, '1번 제목입니다', '1번 내용입니다', 'user01'); 

update board
set    author = ?
where board_id = ?;

delete from board
where board_id = 3; -- 1201

alter table board
add column images varchar(500); -- 1201 int(20) not null auto_increment,
  title varchar(100) not null,
  content    varchar(100) not null,
  author varchar(50) not null,
  create_date timestamp default current_timestamp on update current_timestamp, 
  primary key (board_id)
);
select * from board;
drop table board;

insert into board (board_id, title, content, author) values(1, '1번 제목입니다', '1번 내용입니다', 'user01'); 

update board
set    author = ?
where board_id = ?;

delete from board
where board_id = 3; -- 1201

alter table board
add column images varchar(500); -- 1201

create table customer (
  id int(20) not null auto_increment,
  name      varchar(250) not null,
  email    varchar(100) not null,
  phone    varchar(50) not null,
  primary key (id)
);-- 1202

insert into customer set name="박수홍", email="su@email.com", phone="010-9090-9090";
insert into customer set name="박종훈", email="jong@email.com", phone="010-8080-8080";
insert into customer set name="박수홍", email="su@email.com", phone="010-9999-9999";

select * from customer;

create table center (
  id int(20) not null,
  center_name varchar(100) not null,
  address varchar(300) not null,
  phone_number varchar(100) not null,
  sido varchar(100) not null,
  primary key(id)
  );
  
  insert into center 
  values(1, 'test', 'test', 'test', 'test');
  
  drop table center;
  
  delete from center
  where id = 1;
  
  select * from center;