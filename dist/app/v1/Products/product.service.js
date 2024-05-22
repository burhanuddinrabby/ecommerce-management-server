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
exports.productServices = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_model_1.default.create(product);
    return data;
});
const getAllProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, 'i'); // 'i' makes it case-insensitive
    const data = yield product_model_1.default.find({
        $or: [
            { name: regex },
            { description: regex },
            { tags: regex },
        ],
    });
    // const data = await ProductModel.find();
    return data;
});
const getProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_model_1.default.findById(id);
    return data;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield product_model_1.default.findByIdAndDelete(id);
    return data;
});
const updateProduct = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const quantity = (_a = product === null || product === void 0 ? void 0 : product.inventory) === null || _a === void 0 ? void 0 : _a.quantity;
    if (quantity > 0) {
        product.inventory.inStock = true;
    }
    const data = yield product_model_1.default.updateOne({
        _id: id
    }, product);
    return data;
});
exports.productServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    deleteProduct,
    updateProduct
};
