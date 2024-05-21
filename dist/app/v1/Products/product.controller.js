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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validate_1 = __importDefault(require("./product.validate"));
// creates a product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //zod validation
        const validatedData = product_validate_1.default.parse(req.body);
        const data = yield product_service_1.productServices.createProductIntoDB(validatedData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: data
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.issues
        });
    }
});
// gets all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const data = yield product_service_1.productServices.getAllProductsFromDB(((_a = req.query) === null || _a === void 0 ? void 0 : _a.searchTerm) || "");
        res.status(200).json({
            success: true,
            message: ((_b = req.query) === null || _b === void 0 ? void 0 : _b.searchTerm) ? `Products matching search term '${(_c = req.query) === null || _c === void 0 ? void 0 : _c.searchTerm}' fetched successfully!` : "Products fetched successfully!",
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = yield product_service_1.productServices.deleteProduct(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // const validatedData = productValidationSchema.parse(req.body);
        const data = yield product_service_1.productServices.updateProduct(productId, req.body);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: data
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.issues
        });
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct
};
