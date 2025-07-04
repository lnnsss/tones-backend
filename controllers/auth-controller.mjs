import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export default class AuthController {
    // Регистрация
    static async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array()[0].msg });
            }

            const { email, password, name, surname, sex, birthdate, isAdmin } = req.body;
            console.log(req.body)

            const existingUser = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
            if (existingUser.rows.length) {
                return res.status(400).json({
                    message: "Пользователь с таким email уже зарегистрирован на сайте",
                })
            }
            console.log(existingUser)

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const user = await db.query(
                `INSERT INTO users (email, password_hash, name, surname, sex, birthdate, avatar, is_admin) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                [email, hash, name, surname, sex, birthdate, null, isAdmin === true]
            );

            const token = jwt.sign(
                {
                    _id: user.rows[0].id,
                    is_admin: user.rows[0].is_admin,
                },
                JWT_SECRET,
                { expiresIn: "24h" }
            );

            const { password_hash, ...userData } = user.rows[0];

            res.status(200).json({
                message: "Успешная регистрация",
                token,
                user: userData,
            })

        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "Ошибка регистрации", error })
        }
    }
    // Вход
    static async login(req, res) {
        try {
            const {email, password} = req.body;

            const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
            if (!user.rows.length) {
                return res.status(400).json({ message: "Неверный логин или пароль" })
            };

            const isPasswordValid = await bcrypt.compare(password, user.rows[0].password_hash);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Неверный логин или пароль" })
            };

            const token = jwt.sign(
                {
                    _id: user.rows[0].id,
                    is_admin: user.rows[0].is_admin
                },
                JWT_SECRET,
                { expiresIn: "24h" }
            );

            const {password_hash, ...userData} = user.rows[0];

            return res.status(200).json({
                message: "Успешный вход",
                token,
                user: userData
            });

        } catch (error) {
           return res.status(400).json({ message: "Ошибка входа", error })
        }
    }
}