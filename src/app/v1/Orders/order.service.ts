import { Product } from "../Products/product.interface";
import ProductModel from "../Products/product.model";
import { Order } from "./order.interface";
import orderModel from "./order.model";

const createOrder = async (order: Order) => {
    const productId : string = order.productId;
    const orderQuantity : number = order.quantity;
    
    const product : Product | null = await ProductModel.findById(productId);
    if (!product || orderQuantity > product.inventory.quantity){
        return null;
    }

    const newQuantity = product.inventory.quantity - orderQuantity;
    const updatedProduct = await ProductModel.findByIdAndUpdate({_id : productId},{
        inventory: {
            quantity: newQuantity,
            inStock: newQuantity > 0 ? true : false
        }
    })



    const result = await orderModel.create(order);
    return result;
}

export const orderServices = {
    createOrder
}