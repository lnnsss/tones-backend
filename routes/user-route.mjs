import express from "express";
import {authMiddleware} from "../middlewares/auth-middleware.mjs";
import UserController from "../controllers/user-controller.mjs";
import {isAdmin, isSelfOrAdmin} from "../middlewares/access-control.mjs";

const router = express.Router();

// Получить информацию о себе
router.get("/getInfo", authMiddleware, UserController.getInfo);

// Получить всех пользователей / Админ
router.get("/", authMiddleware, isAdmin, UserController.getAllUsers);

// Получить пользователя по ID / Админ или пользователь
router.get("/:id", authMiddleware, isSelfOrAdmin, UserController.getUserById);


export default router;
