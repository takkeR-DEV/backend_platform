import express from 'express';
import {createPost, deletePostById, getAllPosts} from '../controllers/post.controller.js';

const router = express.Router();

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Создать новый пост
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пост успешно создан
 */
router.post('/posts', createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Получить все посты
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Успешно
 */
router.get('/posts', getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Удалить пост по ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Пост удалён
 *       404:
 *         description: Пост не найден
 */
router.delete('/posts/:id', deletePostById);

export default router;