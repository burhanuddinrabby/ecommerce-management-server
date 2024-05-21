import { Product } from "./product.interface";
import ProductModel from "./product.model";

const createProductIntoDB = async (product: Product) => {
    const data = await ProductModel.create(product);
    return data;
}

const getAllProductsFromDB = async () => {
    const data = await ProductModel.find();
    return data;
}

const getProductByIdFromDB = async (id: string) => {
    const data = await ProductModel.findById(id);
    return data;
}

export const productServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductByIdFromDB
}
