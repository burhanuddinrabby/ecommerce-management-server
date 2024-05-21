"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
// creates a product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const data = yield product_service_1.productServices.createProductIntoDB(product);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: data
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message
        });
    }
});
// gets all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield product_service_1.productServices.getAllProductsFromDB();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: data
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message
        });
    }
});
// gets a single product by id
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = yield product_service_1.productServices.getProductByIdFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: data
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message
        });
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getSingleProduct
};
