"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// endpoint: /api/products
router.post('/', product_controller_1.productController.createProduct); //create product
//endpoint: /api/products || ?searchTerm=iphone
router.get('/', product_controller_1.productController.getAllProducts); //gets all products
// endpoint: /api/products/:productId
router.get('/:productId', product_controller_1.productController.getSingleProduct); //gets a single product
router.put('/:productId', product_controller_1.productController.updateProduct); //gets a single product
router.delete('/:productId', product_controller_1.productController.deleteProduct); //delete product
exports.productRoute = router;
