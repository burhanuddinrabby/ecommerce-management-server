import { Schema, model } from "mongoose";
import { Product } from './product.interface';

const variantSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    }
});
const ProductSchema = new Schema<Product>({
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

const ProductModel = model<Product>('Product', ProductSchema);

export default ProductModel;