import express from 'express';
// import nanoid from 'nanoid';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Are you there!')
})

export default router