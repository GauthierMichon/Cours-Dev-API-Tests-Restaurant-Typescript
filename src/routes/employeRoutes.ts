const express = require("express");

import {
  createEmploye,
  deleteEmploye,
  getEmployeById,
  getEmployes,
  updateEmploye,
} from "../controllers/employeController";

const router = express.Router();

router.get("/", getEmployes);
router.get("/:id", getEmployeById);
router.post("/", createEmploye);
router.put("/:id", updateEmploye);
router.delete("/:id", deleteEmploye);

export default router;
