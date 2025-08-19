import express from 'express';
import userRouters from './src/routes/UserRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './src/routes/ProductRoutes.js';
import { stockRoutes } from './src/routes/StockRoutes.js';
import { authenticate } from './src/middleware/auth.js';
import paymentRoutes from './src/routes/PaymentRoutes.js';
import supplierRoutes from './src/routes/SuplierRoute.js';
import cardDetailRoutes from './src/routes/CardDetailRoutes.js';

const app = express();
const PORT = 3000;

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
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/supplier', supplierRoutes);
app.use('/api/v1/card-detail', cardDetailRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

