"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// endpoint: /api/orders
router.post("/", order_controller_1.orderController.handleCreateOrder); //creates an order
// endpoint: /api/products || ?email=xyz@gmail.com
router.get("/", order_controller_1.orderController.handleGetOrders); //gets all orders
exports.orderRoute = router;
