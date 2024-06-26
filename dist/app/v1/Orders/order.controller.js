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
exports.orderController = void 0;
const order_validate_1 = __importDefault(require("./order.validate"));
const order_service_1 = require("./order.service");
const handleCreateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const validatedData = order_validate_1.default.parse(req.body);
        const data = yield order_service_1.orderServices.createOrder(validatedData);
        //if data creation fails
        if (!data) {
            throw new Error();
        }
        ;
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: data
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.issues) ? (_a = err === null || err === void 0 ? void 0 : err.issues[0]) === null || _a === void 0 ? void 0 : _a.message : "Product id is not valid! or Quantity is greater than inventory quantity!"
        });
    }
});
const handleGetOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield order_service_1.orderServices.getOrders(req);
        //if no orders is found
        if (data.length === 0) {
            throw new Error("Order not found");
        }
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
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
exports.orderController = {
    handleCreateOrder,
    handleGetOrders
};
