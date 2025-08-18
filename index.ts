import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/UserRoute.js';

const app = express();
const PORT = 3000;

// CORS Configuration 
app.use(cors({
  origin: 'http://localhost:5174', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Express hi it hansra!');
});

app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

