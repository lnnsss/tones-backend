import db from "../db.js";

export default class UserController {

    // Получить всех пользователей
    static async getAllUsers(req, res) {
        try {
            const result = await db.query(`SELECT id, email, name, surname, sex, birthdate, avatar, is_admin FROM users`);
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ message: "Ошибка получения пользователей", error });
        }
    }

    // Получить пользователя по ID
    static async getUserById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await db.query(`SELECT id, email, name, surname, sex, birthdate, avatar, is_admin FROM users WHERE id = $1`, [id]);

            if (!result.rows.length) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }

            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ message: "Ошибка получения пользователя", error });
        }
    }

    // Получить пользователя о себе
    static async getInfo(req, res) {
        try {
            const result = await db.query(
                `SELECT id, email, name, surname, sex, birthdate, avatar, is_admin FROM users WHERE id = $1`,
                [req.user._id]
            );

            if (!result.rows.length) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }

            res.status(200).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ message: "Ошибка получения информации о пользователе", error });
        }
    }

}
