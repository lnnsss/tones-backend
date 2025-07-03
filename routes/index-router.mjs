import {Router} from "express";
import authRouter from "./auth-router.mjs";

const router = new Router();

router.use("/auth", authRouter)

export default router;