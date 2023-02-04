create schema news collate utf8mb3_general_ci;
use news;
create table posts
(
    id        int auto_increment,
    title     varchar(200)           not null,
    content   text                   not null,
    image     varchar(100)           null,
    createdAt datetime default NOW() not null,
    constraint news_pk
        primary key (id)
);
INSERT INTO news.posts (title, content, image, createdAt) VALUES ('Bill Gates lectures Musk on spending money', 'Microsoft co-founder Bill Gates believes the SpaceX CEO Elon Musk’s fortune would be better spent on vaccines than Mars missions', 'images/2a51a0d4-d5ed-46f3-af77-20e68a09b5aa.jpg', DEFAULT);
INSERT INTO news.posts (title, content, image, createdAt) VALUES ('‘Teflon’ Elon Musk wins again as jury rejects Tesla tweet fraud claims - Indiatimes.com', 'The Fine Print: The following comments are owned by whoever posted them. We are not responsible for them in any way.', null, DEFAULT);
create table comments
(
    id      int auto_increment,
    post_id int          not null,
    author  varchar(200) null,
    text    text         not null,
    constraint comments_pk
        primary key (id),
    constraint comments_post_id_fk
        foreign key (post_id) references posts (id)
            on delete cascade
);
INSERT INTO news.comments (post_id, author, text) VALUES (1, '', 'It is awesome new!');