import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

import "./config/db.js";
import employeeRoutes from "./routes/employe.routes.js";
import { initializeDatabase } from "./config/db.js";


const app = express();
initializeDatabase();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Running");
});

app.use("/api/employees", employeeRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});
