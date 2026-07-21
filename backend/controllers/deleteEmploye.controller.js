import db from "../config/db.js";

export const deleteEmployee = (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM employees WHERE id=?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ message: "Employee Deleted" });
    });
};