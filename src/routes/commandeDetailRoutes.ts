const express = require("express");

import {
  getCommandeDetails,
  getCommandeDetailById,
  createCommandeDetail,
  updateCommandeDetail,
  deleteCommandeDetail,
} from "../controllers/commandeDetailController";

const router = express.Router();

router.get("/", getCommandeDetails);
router.get("/:id", getCommandeDetailById);
router.post("/", createCommandeDetail);
router.put("/:id", updateCommandeDetail);
router.delete("/:id", deleteCommandeDetail);

export default router;
