import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRoute } from "./app/v1/Products/product.route";

// middlewares
const app:Application = express();
app.use(express.json());
app.use(cors());

//root route
app.get('/', (req: Request, res: Response) => {
    res.send("Hello I'm doing assignment 2");
})

//product routes
app.use("/api/products", productRoute);


// unknown route
app.all("*", (req:Request, res:Response)=>{
    res.status(400).json({
        success:false,
        message: req.url + " router not found"
    })
})
export default app;