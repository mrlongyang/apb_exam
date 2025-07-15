import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
