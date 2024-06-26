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
exports.orderServices = void 0;
const product_model_1 = __importDefault(require("../Products/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = order.productId;
    const orderQuantity = order.quantity;
    const product = yield product_model_1.default.findById(productId);
    //check if product exists and if the order quantity is greater than the inventory quantity
    if (!product || orderQuantity > product.inventory.quantity) {
        return null;
    }
    //update the product inventory after order is placed
    const newQuantity = product.inventory.quantity - orderQuantity;
    const updatedProduct = yield product_model_1.default.findByIdAndUpdate({ _id: productId }, {
        inventory: {
            quantity: newQuantity,
            inStock: newQuantity > 0 ? true : false
        }
    });
    const result = yield order_model_1.default.create(order);
    return result;
});
const getOrders = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield order_model_1.default.find(req.query);
    return data;
});
exports.orderServices = {
    createOrder,
    getOrders
};
