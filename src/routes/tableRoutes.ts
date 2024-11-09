const express = require("express");

import {
  getTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
} from "../controllers/tableController";

const router = express.Router();

router.get("/", getTables);
router.get("/:id", getTableById);
router.post("/", createTable);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);

export default router;
