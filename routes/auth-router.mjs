import {Router} from "express";
import AuthController from "../controllers/auth-controller.mjs";
import {registerValidation} from "../middlewares/register-validation.mjs";

const router = new Router();

// Регистрация
router.post('/registration', registerValidation, AuthController.registration);
// Вход
router.post('/login', AuthController.login);

export default router;