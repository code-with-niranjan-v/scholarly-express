import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { databaseConnect } from "./utils/databaseConnect.js";
import "dotenv/config";
import userRouter from "./routes/user.js";
const app = new express();
const port = 4000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

databaseConnect();
app.use("/user", userRouter);
app.listen(port, () => {
  console.log("Listening at Port 4000");
});
