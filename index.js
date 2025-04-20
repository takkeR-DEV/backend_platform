import dotenv from 'dotenv';
import express from 'express';
import postRoutes from './routes/post.routes.js';
import { pool } from './db/index.js';


dotenv.config();

console.log('URL из .env:', process.env.DATABASE_URL);
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(postRoutes);

async function createTableIfNotExists() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    )
  `);
}

async function startApp() {
    try {
        await createTableIfNotExists();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Startup error:', error);
    }
}

startApp();