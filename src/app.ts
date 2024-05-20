import express, { Request, Response } from "express";
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send("Hello I'm doing assignment 2");
})

export default app;