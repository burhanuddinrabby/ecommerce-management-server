import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function connect() {
    try{
        await mongoose.connect(config.db_url as string, { retryWrites: true, w: 'majority' })
            .then(() => {
                console.log("Connected to the database")
            })
            .catch((err) => {
                console.log("Error connecting to the database", err)
            })

        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
        })
    }catch(err){
        console.log(err);
    }
}
connect();