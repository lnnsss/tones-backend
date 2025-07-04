import { body } from "express-validator";
import dayjs from "dayjs";

export const registerValidation = [
    body("email")
        .isEmail()
        .withMessage("Неверный формат электронной почты")
        .not()
        .contains(" ")
        .withMessage("Электронная почта не должна содержать пробелов"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Пароль должен содержать не меньше 6 символов")
        .matches(/[a-z]/)
        .withMessage("Пароль должен содержать строчные буквы")
        .matches(/[A-Z]/)
        .withMessage("Пароль должен содержать заглавные буквы")
        .matches(/[!#$%&?]/)
        .withMessage("Пароль должен содержать специальные символы (! # $ % & ?)")
        .not()
        .matches(/[а-яА-Я]/)
        .withMessage("Пароль не должен содержать русские буквы")
        .not()
        .contains(" ")
        .withMessage("Пароль не должен содержать пробелов"),

    body("name")
        .isAlpha("ru-RU")
        .withMessage("Имя должно содержать только русские буквы")
        .isLength({ max: 14 })
        .withMessage("Имя не должно быть длиннее 14 символов"),

    body("surname")
        .isAlpha("ru-RU")
        .withMessage("Фамилия должна содержать только русские буквы")
        .isLength({ max: 20 })
        .withMessage("Фамилия не должна быть длиннее 20 символов"),

    body("sex")
        .custom(value => value === "М" || value === "Ж")
        .withMessage("Пол должен быть либо 'М', либо 'Ж'"),

    body("birthdate")
        .isDate({ format: "YYYY-MM-DD" })
        .withMessage("Дата рождения должна быть в формате ГГГГ-ММ-ДД")
        .custom(value => {
            const birth = dayjs(value);
            if (!birth.isValid()) {
                throw new Error("Неверная дата рождения");
            }

            const age = dayjs().diff(birth, 'year');
            if (age < 14) {
                throw new Error("Регистрация разрешена только с 14 лет");
            }

            return true;
        })
];
