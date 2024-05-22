import exp from "constants";

/*
const story = await Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec();
*/
export type Order = {
    email: string,
    productId: string,
    price: number,
    quantity: number
}