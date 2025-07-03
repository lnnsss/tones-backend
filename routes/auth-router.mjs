import {Router} from "express";
import AuthController from "../controllers/auth-controller.mjs";

const router = new Router();

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);

export default router;