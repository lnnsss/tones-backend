// Только для админа
export function isAdmin(req, res, next) {
    if (!req.user?.is_admin) {
        return res.status(403).json({ message: "Доступ только для админа" });
    }
    next();
}

// Для админа или пользователя с тем же ID
export function isSelfOrAdmin(req, res, next) {
    const userIdFromParams = parseInt(req.params.id, 10);
    if (!req.user?.is_admin && req.user?._id !== userIdFromParams) {
        return res.status(403).json({ message: "Нет доступа к этому пользователю" });
    }
    next();
}
