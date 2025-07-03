import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import indexRouter from "./routes/index-router.mjs";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use(indexRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})