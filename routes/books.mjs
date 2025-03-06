import express from 'express';
// import { nanoid } from 'nanoid';
const router = express.Router();

// const idLength = 8;

router.get('/', (req, res) => {
    // res.send('helloooooo')
    console.log("Books to be shown:", req.app.db.data.books);
    const books = req.app.db.data.books; 
    res.status(201).json(books);
})


export default router