import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

// endpoint: /api/orders
router.post("/", orderController.handleCreateOrder)//creates an order
// endpoint: /api/products || ?email=xyz@gmail.com
router.get("/", orderController.handleGetOrders)//gets all orders


export const orderRoute =  router;