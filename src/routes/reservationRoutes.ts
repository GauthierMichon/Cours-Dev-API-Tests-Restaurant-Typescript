const express = require("express");

import {
  createReservation,
  deleteReservation,
  getReservationById,
  getReservations,
  updateReservation,
} from "../controllers/reservationController";

const router = express.Router();

router.get("/", getReservations);
router.get("/:id", getReservationById);
router.post("/", createReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

export default router;
