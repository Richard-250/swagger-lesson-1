import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Books from './routes/books.mjs'

const app = express();
app.use(express.json());
app.use(Books)
app.use(cors());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;

// ✅ Provide `defaultData`
const defaultData = { books: [] }; // Ensure default structure
const adapter = new JSONFile('db.json'); 
const db = new Low(adapter, defaultData);

db.read();
db.data ||= defaultData; // Ensure it's initialized

const writeDb = () => {
    if (db.data.books.length !== defaultData.books.length) {
        db.write()
    }
}
writeDb(); 
app.post('/addbook', (req, res) => {
    const { title, author } = req.body;
    db.data.books.push({ title, author });
    writeDb(); // Ensure we only write when data changes
    res.status(201).json({ message: 'Book added successfully' });
  });

app.db = db;



app.listen(PORT, () => console.log(`The Server is running on ${PORT}`));

