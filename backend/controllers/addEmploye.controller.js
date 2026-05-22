import db from "../config/db.js";

export const createEmployee = (req, res) => {

    const { name, email, department, salary } = req.body;

    const sql =
        "INSERT INTO employees(name,email,department,salary) VALUES(?,?,?,?)";

    db.query(
        sql,
        [name, email, department, salary],
        (err, result) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        message: "Email already exists"
                    });
                }

                return res.status(500).json(err);
            }

            res.json({
                message: "Employee Added"
            });
        }
    );
};
