"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var cors = ;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("Hello I'm doing assignment 2");
});
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: req.url + " router not found"
    });
});
exports.default = app;
