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
INSERT INTO news.posts (title, content, image, createdAt) VALUES ('Bill Gates lectures Musk on spending money', 'Microsoft co-founder Bill Gates believes the SpaceX CEO’s self-declared mission to save humanity from extinction by colonizing Mars is not a good use of Elon Musk`s fortune, which would be better spent on goals like mass vaccination to save people’s lives back on Earth.
Gates said he does not consider Musk to be a real philanthropist, while acknowledging in an interview with the BBC released on Friday that some of his endeavors, like the electric vehicle company Tesla, “are having a positive impact.”
“I think some day he will join the ranks of philanthropists using his ingenuity,” Gates added,  because “at the end of the day” he can’t possibly spend all of his money on himself, “other than going to Mars a few times, which might cost a little bit.”
Gates argued that there are more immediate and pressing issues facing humanity than a Mars mission, such as mass vaccination. “It’s actually quite expensive to go to Mars,” he said in the interview. “You can buy measles vaccines and save lives for a thousand dollars per life saved. It just kind of grounds you, as in – don`t go to Mars.”', 'images/2a51a0d4-d5ed-46f3-af77-20e68a09b5aa.jpg', DEFAULT);
INSERT INTO news.posts (title, content, image, createdAt) VALUES ('‘Teflon’ Elon Musk wins again as jury rejects Tesla tweet fraud claims - Indiatimes.com', 'On Friday, a federal jury in San Francisco took just two hou
 Inc chief executive officer of claims by investors that he defrauded them when he tweeted 4 1/2 years ago that he was considering taking the company private and had “funding secured” to make the deal happen. The outcome marked another victory for the billionaire’s go-to lawyer, Alex Spiro, in a risky trial that many high-profile executives would have avoided by reaching an out-of-court settlement.', null, DEFAULT);
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
INSERT INTO news.comments (post_id, author, text) VALUES (1, '', 'It is awesome post!');
INSERT INTO news.comments (post_id, author, text) VALUES (2, 'Someone', 'I\'m scared!');