const express = require("express");

import {
  getCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande,
} from "../controllers/commandeController";

const router = express.Router();

router.get("/", getCommandes);
router.get("/:id", getCommandeById);
router.post("/", createCommande);
router.put("/:id", updateCommande);
router.delete("/:id", deleteCommande);

export default router;
