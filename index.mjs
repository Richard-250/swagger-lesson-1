import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import booksRouter from './routes/books.mjs';

const app = express();
app.use(express.json());
app.use('/books', booksRouter);
app.use(cors());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;

const defaultData = { books: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

app.db = db;

const writeDb = async () => {
    if (db.data.books.length !== defaultData.books.length) {
        await db.write(); // Ensure we write only when data changes
    }
}

const initializeDb = async () => {
    await db.read();
    console.log('Database data after read:', db.data);
    db.data ||= defaultData; // Ensure it's initialized
    // await writeDb();
};

initializeDb(); // Initialize database

app.post('/addbook', async (req, res) => {
    const { title, author } = req.body;
    db.data.books.push({ title, author });
    await writeDb(); // Ensure we only write when data changes
    res.status(201).json({ message: 'Book added successfully' });
});

app.listen(PORT, () => console.log(`The Server is running on ${PORT}`));
 HEAD
 
 d0c4f5a (initialize database)
