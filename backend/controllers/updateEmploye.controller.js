import db from "../config/db.js";

export const updateEmployee = (req, res) => {
    const id = req.params.id;
    const { name, email, department, salary } = req.body;

    const sql =
        "UPDATE employees SET name=?, email=?, department=?, salary=? WHERE id=?";

    db.query(sql,
        [name, email, department, salary, id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({ message: "Employee Updated" });
        }
    );
};