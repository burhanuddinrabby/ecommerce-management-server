import { Request, Response } from "express";
import { productServices } from "./product.service";
import { z } from "zod";
import productValidationSchema from "./product.validate";

// creates a product
const createProduct = async (req: Request, res: Response) => {
    try {
        //zod validation
        const validatedData = productValidationSchema.parse(req.body);

        const data = await productServices.createProductIntoDB(validatedData);

        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: data
        })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err?.issues
        })
    }
};

// gets all products
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const data = await productServices.getAllProductsFromDB(req.query?.searchTerm as string || "");

        res.status(200).json({
            success: true,
            message: req.query?.searchTerm ? `Products matching search term '${req.query?.searchTerm}' fetched successfully!` : "Products fetched successfully!",
            data: data
        })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err?.message
        })

    }
}

// gets a single product by id
const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const data = await productServices.getProductByIdFromDB(productId);

        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: data
        })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err?.message
        })

    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const data = await productServices.deleteProduct(productId);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null
        })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err?.message
        })
    }
}

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        // const validatedData = productValidationSchema.parse(req.body);

        const data = await productServices.updateProduct(productId, req.body);

        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: data
        })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err?.issues
        })
    }

}

export const productController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct
}