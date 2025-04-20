import express from 'express';
import {createPost, deletePostById, getAllPosts} from '../controllers/post.controller.js';

const router = express.Router();

router.post('/', createPost);
router.get('/posts', getAllPosts);
router.delete('/posts/:id', deletePostById);

export default router;