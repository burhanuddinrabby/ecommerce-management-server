import { Request, Response } from "express";
import orderValidationSchema from "./order.validate";
import { orderServices } from "./order.service";
import { Order } from "./order.interface";


const handleCreateOrder = async (req: Request, res: Response) => {
    try {
        const validatedData = orderValidationSchema.parse(req.body);

        const data : Order | null = await orderServices.createOrder(validatedData);

        //if data creation fails
        if (!data) {
            throw new Error();
        };
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: data
        })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err?.issues ? err?.issues[0]?.message : "Product id is not valid! or Quantity is greater than inventory quantity!"
        })
    }
}

const handleGetOrders = async (req: Request, res: Response) => {
    try {
        const data = await orderServices.getOrders(req);
        
        //if no orders is found
        if(data.length === 0){
            throw new Error("Order not found")
        }
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: data
        })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err?.message
        })
    }

}

export const orderController = {
    handleCreateOrder,
    handleGetOrders
}