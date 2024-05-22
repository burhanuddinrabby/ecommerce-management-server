import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/", orderController.handleCreateOrder)
router.get("/", orderController.handleGetOrders)


export const orderRoute =  router;