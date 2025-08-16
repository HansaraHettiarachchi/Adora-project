import express from 'express';
import userRouter from './src/routes/UserRoute.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello from Express hi it hansra!');
});

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

