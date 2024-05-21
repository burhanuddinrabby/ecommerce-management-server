import { Request, Response } from "express";
import { productServices } from "./product.service";

// creates a product
const createProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        const data = await productServices.createProductIntoDB(product);

        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: data
        })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err?.message
        })
    }
};

// gets all products
const getAllProducts = async (req: Request, res: Response) => {
    try{
        const data = await productServices.getAllProductsFromDB();

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: data
        })
    }catch(err: any){
        res.status(400).json({
            success: false,
            message: err?.message
        })
    
    }
}

// gets a single product by id
const getSingleProduct = async (req: Request, res: Response) => {
    try{
        const { productId } = req.params;
        const data = await productServices.getProductByIdFromDB(productId);

        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: data
        })
    }catch(err: any){
        res.status(400).json({
            success: false,
            message: err?.message
        })
    
    }
}

export const productController = {
    createProduct,
    getAllProducts,
    getSingleProduct
}