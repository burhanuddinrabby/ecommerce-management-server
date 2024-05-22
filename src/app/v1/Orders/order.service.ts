import { Request } from "express";
import { Product } from "../Products/product.interface";
import ProductModel from "../Products/product.model";
import { Order } from "./order.interface";
import orderModel from "./order.model";

const createOrder = async (order: Order) => {
    const productId : string = order.productId;
    const orderQuantity : number = order.quantity;
    
    const product : Product | null = await ProductModel.findById(productId);
    
    //check if product exists and if the order quantity is greater than the inventory quantity
    if (!product || orderQuantity > product.inventory.quantity){
        return null;
    }

    //update the product inventory after order is placed
    const newQuantity = product.inventory.quantity - orderQuantity;
    const updatedProduct = await ProductModel.findByIdAndUpdate({_id : productId},{
        inventory: {
            quantity: newQuantity,
            inStock: newQuantity > 0 ? true : false
        }
    });

    const result = await orderModel.create(order);
    return result;
}

const getOrders = async (req : Request) => {
    const data = await orderModel.find(req.query);
    return data;
}

export const orderServices = {
    createOrder,
    getOrders
}