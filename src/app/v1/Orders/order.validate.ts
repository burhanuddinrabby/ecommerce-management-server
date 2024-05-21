import { z } from "zod";

const orderValidationSchema = z.object({
    email : z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email address"
    }),
    productId: z.string({
        required_error: "ProductId is required",
        invalid_type_error: "ProductId must be a string",
    }),
    price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    }).positive({
        message: "Price must be a positive number"
    }),
    quantity: z.number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
    }).positive({
        message: "Quantity must be a positive number"
    })
})

export default orderValidationSchema;