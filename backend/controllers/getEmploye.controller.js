import db from "../config/db.js";

export const getEmployees = (req, res) => {
    const sql = "SELECT * FROM employees";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
};  