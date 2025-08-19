import express from 'express';
import cors from 'cors';
import userRouters from './src/routes/UserRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './src/routes/ProductRoutes.js';
import { stockRoutes } from './src/routes/StockRoutes.js';
import { authenticate } from './src/middleware/auth.js';
import paymentRoutes from './src/routes/PaymentRoute.js';
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'static', 'uploads')));
app.use('/api/v1/users', userRouters);
app.use('/api/v1/product', authenticate, productRoutes);
app.use('/api/v1/stock', authenticate, stockRoutes);
app.use('/api/v1/payment', authenticate, paymentRoutes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map