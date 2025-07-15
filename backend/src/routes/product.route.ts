import { Router } from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller';
import { requireAuth } from '../middlewares/auth.middleware';
const router = Router();
router.get('/', requireAuth, getProducts);
router.post('/', requireAuth, createProduct);
router.put('/:id', requireAuth, updateProduct);
router.delete('/:id', requireAuth, deleteProduct);
export default router;
