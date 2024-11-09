import { Request, Response } from "express";
import { initDB } from "../database/database";
import { IReservation } from "../models/IReservation";

export const getReservations = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const reservations = await db.all<IReservation[]>(
      "SELECT * FROM Reservations"
    );
    res.status(200).json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des réservations" });
  } finally {
    db.close();
  }
};

// Récupérer une réservation par ID
export const getReservationById = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const reservation = await db.get<IReservation>(
      "SELECT * FROM Reservations WHERE reservation_id = ?",
      [req.params.id]
    );
    if (!reservation)
      return res.status(404).json({ error: "Réservation non trouvée" });
    res.status(200).json(reservation);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la réservation" });
  } finally {
    db.close();
  }
};

// Créer une nouvelle réservation
export const createReservation = async (req: Request, res: Response) => {
  const {
    client_id,
    table_id,
    date_reservation,
    heure_reservation,
    nombre_personnes,
  } = req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `INSERT INTO Reservations (client_id, table_id, date_reservation, heure_reservation, nombre_personnes) 
           VALUES (?, ?, ?, ?, ?)`,
      [
        client_id,
        table_id,
        date_reservation,
        heure_reservation,
        nombre_personnes,
      ]
    );
    res.status(201).json({
      reservation_id: result.lastID,
      client_id,
      table_id,
      date_reservation,
      heure_reservation,
      nombre_personnes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la réservation" });
  } finally {
    db.close();
  }
};

// Mettre à jour une réservation par ID
export const updateReservation = async (req: Request, res: Response) => {
  const {
    client_id,
    table_id,
    date_reservation,
    heure_reservation,
    nombre_personnes,
  } = req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `UPDATE Reservations 
           SET client_id = ?, table_id = ?, date_reservation = ?, heure_reservation = ?, nombre_personnes = ? 
           WHERE reservation_id = ?`,
      [
        client_id,
        table_id,
        date_reservation,
        heure_reservation,
        nombre_personnes,
        req.params.id,
      ]
    );
    if (result.changes === 0)
      return res.status(404).json({ error: "Réservation non trouvée" });
    res.status(200).json({ message: "Réservation mise à jour avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la réservation" });
  } finally {
    db.close();
  }
};

// Supprimer une réservation par ID
export const deleteReservation = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const result = await db.run(
      "DELETE FROM Reservations WHERE reservation_id = ?",
      [req.params.id]
    );
    if (result.changes === 0)
      return res.status(404).json({ error: "Réservation non trouvée" });
    res.status(200).json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la réservation" });
  } finally {
    db.close();
  }
};
