"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/v1/Products/product.route");
// middlewares
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//root route
app.get('/', (req, res) => {
    res.send("Hello I'm doing assignment 2");
});
//product routes
app.use("/api/products", product_route_1.productRoute);
// unknown route
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: req.url + " router not found"
    });
});
exports.default = app;
