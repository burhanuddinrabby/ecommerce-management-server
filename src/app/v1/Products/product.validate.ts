import { z } from "zod";

const productValidationSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
    }),
    price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    }).positive({
        message: "Price must be a positive number"
    }),
    category: z.string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
    }),
    tags: z.array(z.string({
        required_error: "Tags are required",
        invalid_type_error: "Tags must be an array of strings",
    }), {
        required_error: "Tags are required",
        invalid_type_error: "Tags must be an array of strings",
    }),
    variants: z.array(z.object({
        type: z.string({
            required_error: "Type is required",
            invalid_type_error: "Type must be a string",
        }),
        value: z.string({
            required_error: "Value is required",
            invalid_type_error: "Value must be a string",
        })
    }), {
        required_error: "Variants are required",
        invalid_type_error: "Variants must be an array of objects",

    }),
    inventory: z.object({
        quantity: z.number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number",
        }).positive({
            message: "Quantity must be a positive number"
        }),
        inStock: z.boolean({
            required_error: "InStock is required",
            invalid_type_error: "InStock must be a boolean",
        })
    })
});

export default productValidationSchema;