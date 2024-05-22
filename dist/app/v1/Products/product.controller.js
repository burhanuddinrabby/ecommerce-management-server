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
    var _a;
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
            message: (_a = err === null || err === void 0 ? void 0 : err.issues[0]) === null || _a === void 0 ? void 0 : _a.message
        });
    }
});
// gets all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    try {
        const data = yield product_service_1.productServices.getAllProductsFromDB(((_b = req.query) === null || _b === void 0 ? void 0 : _b.searchTerm) || "");
        //if no data is found
        if (data.length === 0) {
            throw new Error(`No product was found matching search term ${(_c = req.query) === null || _c === void 0 ? void 0 : _c.searchTerm}`);
        }
        //successful response
        res.status(200).json({
            success: true,
            message: ((_d = req.query) === null || _d === void 0 ? void 0 : _d.searchTerm) ? `Products matching search term '${(_e = req.query) === null || _e === void 0 ? void 0 : _e.searchTerm}' fetched successfully!` : "Products fetched successfully!",
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
        //if no data is found
        if (!data) {
            throw new Error(`No product was found by _id:${productId}`);
        }
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
        //if no data is found
        if (!data) {
            throw new Error("Product deletion failed!");
        }
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
    var _f, _g, _h, _j, _k, _l, _m, _o;
    try {
        const { productId } = req.params;
        const prevProduct = yield product_service_1.productServices.getProductByIdFromDB(productId);
        //if no data is found
        if (!prevProduct) {
            throw new Error("Product with _id:" + productId + " not found!");
        }
        const updatedProductData = {
            name: ((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.name) || prevProduct.name,
            price: ((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.price) || prevProduct.price,
            description: ((_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.description) || prevProduct.description,
            category: ((_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.category) || prevProduct.category,
            tags: ((_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.tags) || prevProduct.tags,
            variants: ((_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.variants) || prevProduct.variants,
            inventory: ((_m = req === null || req === void 0 ? void 0 : req.body) === null || _m === void 0 ? void 0 : _m.inventory) || prevProduct.inventory
        };
        const validatedData = product_validate_1.default.parse(updatedProductData);
        const data = yield product_service_1.productServices.updateProduct(productId, validatedData);
        //if data is not updated 
        if (data.modifiedCount === 0) {
            throw new Error("Product was not updated!");
        }
        const updatedProduct = yield product_service_1.productServices.getProductByIdFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedProduct
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.issues) ? (_o = err === null || err === void 0 ? void 0 : err.issues[0]) === null || _o === void 0 ? void 0 : _o.message : ((err instanceof Error) ? err === null || err === void 0 ? void 0 : err.message : "Something went wrong!")
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
