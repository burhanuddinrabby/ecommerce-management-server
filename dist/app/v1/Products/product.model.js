"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    }
});
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    variants: {
        type: [
            variantSchema
        ],
        required: true
    },
    inventory: {
        type: {
            quantity: Number,
            inStock: Boolean
        },
        required: true
    }
});
const ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = ProductModel;
