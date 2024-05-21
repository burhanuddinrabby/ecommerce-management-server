import exp from "constants";

/*{
    "email": "level2@programming-hero.com",
        "productId": "5fd67e890b60c903cd8544a3",
            "price": 999,
                "quantity": 1
}
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