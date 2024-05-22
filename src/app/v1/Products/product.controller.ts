import { Request, Response } from "express";
import { productServices } from "./product.service";
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
            message: err?.issues[0]?.message
        })
    }
};

// gets all products
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const data = await productServices.getAllProductsFromDB(req.query?.searchTerm as string || "");

        //if no data is found
        if (data.length === 0) {
            throw new Error(`No product was found matching search term ${req.query?.searchTerm}`)
        }

        //successful response
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

        //if no data is found
        if (!data) {
            throw new Error(`No product was found by _id:${productId}`)
        }

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

        //if no data is found
        if (!data) {
            throw new Error("Product deletion failed!");
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: data
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

        const prevProduct = await productServices.getProductByIdFromDB(productId);

        //if no data is found
        if (!prevProduct) {
            throw new Error("Product with _id:" + productId + " not found!");
        }

        const updatedProductData = {
            name: req?.body?.name || prevProduct.name,
            price: req?.body?.price || prevProduct.price,
            description: req?.body?.description || prevProduct.description,
            category: req?.body?.category || prevProduct.category,
            tags: req?.body?.tags || prevProduct.tags,
            variants: req?.body?.variants || prevProduct.variants,
            inventory: req?.body?.inventory || prevProduct.inventory
        }

        const validatedData = productValidationSchema.parse(updatedProductData);

        const data = await productServices.updateProduct(productId, validatedData);

        //if data is not updated 
        if (data.modifiedCount === 0) {
            throw new Error("Product was not updated!");
        }
        const updatedProduct = await productServices.getProductByIdFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedProduct
        })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err?.issues ? err?.issues[0]?.message : ((err instanceof Error) ? err?.message : "Something went wrong!")
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