import express from 'express';
import {createTodos, deleteTodoById, getAllTodos} from "../controllers/todos.controller.js";
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Создать новую задачу
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               edit:
 *                 type: boolean
 *               completed:
 *                 type: boolean
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Задача успешно создана
 */

router.post(
    '/todos',
    body('title')
        .isString().withMessage('Title must be a string')
        .trim()
        .notEmpty().withMessage('Title cannot be empty')
        .isLength({ min: 3, max: 15 }).withMessage('Title must be between 3 and 15 characters'),

    body('author')
        .isString().withMessage('Author must be a string')
        .trim()
        .notEmpty().withMessage('Author cannot be empty')
        .isLength({ min: 3, max: 15 }).withMessage('Author must be between 3 and 15 characters'),

    body('edit')
        .isBoolean().withMessage('Edit must be a boolean'),

    body('completed')
        .isBoolean().withMessage('Completed must be a boolean'),

    body('createdAt')
        .optional()
        .isISO8601().withMessage('createdAt must be a valid ISO 8601 date'),

    createTodos
);
/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Получить все задачи
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: Успешно
 */
router.get('/todos', getAllTodos);
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Удалить задачу по ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Задача удалена
 *       404:
 *         description: Задача не найдена
 */
router.delete('/todos/:id', deleteTodoById);

export default router;