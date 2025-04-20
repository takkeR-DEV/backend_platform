import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import postRoutes from './routes/post.routes.js';
import todoRoutes from './routes/todos.routes.js';
import { pool } from './db/index.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';


dotenv.config();

console.log('URL из .env:', process.env.DATABASE_URL);
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(postRoutes);
app.use(todoRoutes);

async function createTableIfNotExists() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    )
  `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      edit BOOLEAN DEFAULT false,
      completed BOOLEAN DEFAULT false,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      author TEXT NOT NULL
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