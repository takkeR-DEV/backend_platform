import express from 'express';
import {createTodos, deleteTodoById, getAllTodos} from "../controllers/todos.controller.js";
import { body } from 'express-validator';

const router = express.Router();

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
router.get('/todos', getAllTodos);
router.delete('/todos/:id', deleteTodoById);

export default router;