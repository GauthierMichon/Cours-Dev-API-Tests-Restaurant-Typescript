import { Request, Response } from "express";
import { initDB } from "../database/database";
import { ICommande } from "../models/ICommande";

// Récupérer toutes les commandes
export const getCommandes = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const commandes = await db.all<ICommande[]>("SELECT * FROM Commandes");
    res.status(200).json(commandes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commandes" });
  } finally {
    db.close();
  }
};

// Récupérer une commande par ID
export const getCommandeById = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const commande = await db.get<ICommande>(
      "SELECT * FROM Commandes WHERE commande_id = ?",
      [req.params.id]
    );
    if (!commande)
      return res.status(404).json({ error: "Commande non trouvée" });
    res.status(200).json(commande);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la commande" });
  } finally {
    db.close();
  }
};

// Créer une nouvelle commande
export const createCommande = async (req: Request, res: Response) => {
  const { reservation_id, employe_id, date_commande, heure_commande, statut } =
    req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `INSERT INTO Commandes (reservation_id, employe_id, date_commande, heure_commande, statut) VALUES (?, ?, ?, ?, ?)`,
      [reservation_id, employe_id, date_commande, heure_commande, statut]
    );
    res
      .status(201)
      .json({
        commande_id: result.lastID,
        reservation_id,
        employe_id,
        date_commande,
        heure_commande,
        statut,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la commande" });
  } finally {
    db.close();
  }
};

// Mettre à jour une commande par ID
export const updateCommande = async (req: Request, res: Response) => {
  const { reservation_id, employe_id, date_commande, heure_commande, statut } =
    req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `UPDATE Commandes SET reservation_id = ?, employe_id = ?, date_commande = ?, heure_commande = ?, statut = ? WHERE commande_id = ?`,
      [
        reservation_id,
        employe_id,
        date_commande,
        heure_commande,
        statut,
        req.params.id,
      ]
    );
    if (result.changes === 0)
      return res.status(404).json({ error: "Commande non trouvée" });
    res.status(200).json({ message: "Commande mise à jour avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la commande" });
  } finally {
    db.close();
  }
};

// Supprimer une commande par ID
export const deleteCommande = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const result = await db.run(`DELETE FROM Commandes WHERE commande_id = ?`, [
      req.params.id,
    ]);
    if (result.changes === 0)
      return res.status(404).json({ error: "Commande non trouvée" });
    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la commande" });
  } finally {
    db.close();
  }
};
