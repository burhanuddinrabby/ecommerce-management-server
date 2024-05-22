"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email address"
    }),
    productId: zod_1.z.string({
        required_error: "ProductId is required",
        invalid_type_error: "ProductId must be a string",
    }),
    price: zod_1.z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    }).positive({
        message: "Price must be a positive number"
    }),
    quantity: zod_1.z.number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
    }).positive({
        message: "Quantity must be a positive number"
    })
});
exports.default = orderValidationSchema;
