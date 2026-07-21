import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect((err) => {

    if (err) {
        console.log("Database Error:", err);
        return;
    }

    console.log("RDS Connected Successfully");

});

export const initializeDatabase = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS employees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            department VARCHAR(100),
            salary DECIMAL(10,2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    db.query(createTableQuery, (err) => {
        if (err) {
            console.error("Error creating employees table:", err);
        } else {
            console.log("✅ Employees table is ready.");
        }
    });
};

export default db;