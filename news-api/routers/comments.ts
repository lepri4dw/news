import express from "express";
import mysqlDB from "../mysqlDB";
import {Comment} from "../types";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
  const connection = mysqlDB.getConnection();
  const post_id = req.query.post_id as string;
  const result = await connection.query('SELECT * FROM comments');
  const comments = result[0] as Comment[];

  if (post_id) {
    return res.send(comments.filter(comment => parseFloat(post_id) === comment.post_id));
  }

  res.send(comments);
});

commentsRouter.post('/', async (req, res) => {
  if (!req.body.text || !req.body.post_id) {
    return res.status(400).send({error: 'Text and post_id must be present in the request'});
  }

  const commentData = {
    author: req.body.author,
    text: req.body.text,
    post_id: req.body.post_id
  };
  const connection = mysqlDB.getConnection();
  await connection.query('INSERT INTO comments (author, text, post_id) VALUES (?, ?, ?)', [commentData.author, commentData.text, commentData.post_id]);
  res.send({message: 'Post was created successfully!'});
});

commentsRouter.delete('/:id', async (req, res) => {
  const connection = mysqlDB.getConnection();
  await connection.query('DELETE FROM comments WHERE id = ?', [req.params.id]);
  res.send({message: 'Deleted'});
});

export default commentsRouter;