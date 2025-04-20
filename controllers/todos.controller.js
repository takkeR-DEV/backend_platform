import { validationResult } from 'express-validator';
import { pool } from '../db/index.js';

export const createTodos = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, edit, completed, author, createdAt } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO todos (title, edit, completed, author, createdAt) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, edit, completed, author, createdAt]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

export const getAllTodos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting posts:', err);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

export const deleteTodoById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM todos WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ message: 'Post deleted', post: result.rows[0] });
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ error: 'Failed to delete post' });
    }
};
