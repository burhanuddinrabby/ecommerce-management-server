import express from 'express';
import { productController } from './product.controller';

const router = express.Router();


// endpoint: /api/products
router.post('/', productController.createProduct);//create product
//endpoint: /api/products || ?searchTerm=iphone
router.get('/', productController.getAllProducts);//gets all products

// endpoint: /api/products/:productId
router.get('/:productId', productController.getSingleProduct);//gets a single product
router.put('/:productId', productController.updateProduct);//gets a single product
router.delete('/:productId', productController.deleteProduct);//delete product

export const productRoute = router;