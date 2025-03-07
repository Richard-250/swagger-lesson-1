import express from 'express';
 
// import nanoid from 'nanoid';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Are you there!')

import { nanoid } from 'nanoid';
// import { nanoid } from 'nanoid';
const router = express.Router();

const isLength = 8;

router.get('/', (req, res) => {
    console.log("Books to be shown:", req.app.db.data.books);
    const books = req.app.db.data.books; // Ensure you access the correct database data
    res.json(books);
});

router.get('/:id', (req, res) => {
    const book = req.app.db.data.books.find({ id: req.params.id }).value();
    res.status(201).json(book);
})

router.post('/', async (req, res) => {
    try {
        const { title, author } = req.body
        const book = {
            id: nanoid(isLength),
            title,
            author
        }
        req.app.db.data.books.push(book)
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
 
})

export default router