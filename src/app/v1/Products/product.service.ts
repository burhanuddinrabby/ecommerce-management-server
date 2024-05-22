import { Product } from "./product.interface";
import ProductModel from "./product.model";

const createProductIntoDB = async (product: Product) => {
    const data = await ProductModel.create(product);
    return data;
}

const getAllProductsFromDB = async (searchTerm: string) => {
    const regex = new RegExp(searchTerm, 'i'); // 'i' makes it case-insensitive

    // data that matches term in name, description or tags
    const data = await ProductModel.find({
        $or: [
            { name: regex },
            { description: regex },
            { tags: regex },
            { variants: { $elemMatch: { type: regex } } }
        ],
    });
    // const data = await ProductModel.find();
    return data;
}

const getProductByIdFromDB = async (id: string) => {
    const data = await ProductModel.findById(id);
    return data;
}

const deleteProduct = async (id: string) => {
    const data = await ProductModel.findByIdAndDelete(id);
    return data;
}

const updateProduct = async (id: string, product: Product) => {
    const quantity = product?.inventory?.quantity;
    if (quantity > 0) {
        product.inventory.inStock = true;
    }
    const data = await ProductModel.updateOne({
        _id: id
    }, product);
    return data;
}

export const productServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    deleteProduct,
    updateProduct
}
