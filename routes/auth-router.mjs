import {Router} from "express";
import AuthController from "../controllers/auth-controller.mjs";

const router = new Router();

// Регистрация
router.post('/registration', AuthController.registration);
// Вход
router.post('/login', AuthController.login);

export default router;