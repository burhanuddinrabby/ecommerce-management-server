import { Schema, model } from "mongoose";
import { Order } from "./order.interface";

const OrderSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    productId:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
})

const orderModel = model<Order>('Order', OrderSchema);

export default orderModel;