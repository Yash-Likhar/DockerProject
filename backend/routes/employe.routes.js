import express from "express";
import { getEmployees } from "../controllers/getEmploye.controller.js";
import { createEmployee } from "../controllers/addEmploye.controller.js";
import { updateEmployee } from "../controllers/updateEmploye.controller.js";
import { deleteEmployee } from "../controllers/deleteEmploye.controller.js";


const router = express.Router();

router.get("/", getEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;