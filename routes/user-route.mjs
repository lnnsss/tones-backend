import express from "express";
import {authMiddleware} from "../middlewares/auth-middleware.mjs";
import UserController from "../controllers/user-controller.mjs";
import {isAdmin, isSelfOrAdmin} from "../middlewares/access-control.mjs";

const router = express.Router();

// Получить всех пользователей
router.get("/", authMiddleware, isAdmin, UserController.getAllUsers);
// Получить пользователя по ID
router.get("/:id", authMiddleware, isSelfOrAdmin, UserController.getUserById);

export default router;
