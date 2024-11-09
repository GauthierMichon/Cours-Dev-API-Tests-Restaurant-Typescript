const express = require("express");

import {
  createClient,
  getClients,
  getClientById,
} from "../controllers/clientController";

const router = express.Router();

router.post("/", createClient);
router.get("/", getClients);
router.get("/:id", getClientById);

export default router;
