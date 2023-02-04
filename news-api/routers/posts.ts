import express from "express";
import mysqlDB from "../mysqlDB";
import {Post} from "../types";
import {imagesUpload} from "../multer";

const postsRouter = express.Router();

postsRouter.get('/', async (req, res) => {
  const connection = mysqlDB.getConnection();
  const result = await connection.query('SELECT * FROM posts');
  const posts = result[0] as Post[];
  const newPosts = posts.map(post => {
    return {
      id: post.id,
      title: post.title,
      image: post.image,
      createdAt: post.createdAt,
    }
  });

  res.send(newPosts);
});

postsRouter.get('/:id', async (req, res) => {
  const connection = mysqlDB.getConnection();
  const result = await connection.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
  const posts = result[0] as Post[];
  const post = posts[0];

  if (!post) {
    return res.status(404).send({error: 'Not Found'});
  }

  res.send(post);
});

postsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).send({error: 'Title and content must be present in the request'});
  }

  const postData = {
    title: req.body.title,
    content: req.body.content,
    image: req.file ? req.file.filename : null,
  };
  const connection = mysqlDB.getConnection();
  await connection.query('INSERT INTO posts (title, content, image) VALUES (?, ?, ?)',
    [postData.title, postData.content, postData.image]);
  res.send({message: 'Post was created successfully!'});
});

postsRouter.delete('/:id', async (req, res) => {
  const connection = mysqlDB.getConnection();
  await connection.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
  res.send({message: 'Deleted'});
})

export default postsRouter;