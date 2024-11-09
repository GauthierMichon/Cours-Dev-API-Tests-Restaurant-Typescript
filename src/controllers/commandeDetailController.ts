import { Request, Response } from "express";
import { initDB } from "../database/database";
import { ICommandeDetail } from "../models/ICommandeDetail";

// Récupérer tous les détails de commande
export const getCommandeDetails = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const details = await db.all<ICommandeDetail[]>(
      "SELECT * FROM Commande_Details"
    );
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des détails de commande",
    });
  } finally {
    db.close();
  }
};

// Récupérer un détail de commande par ID
export const getCommandeDetailById = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const detail = await db.get<ICommandeDetail>(
      "SELECT * FROM Commande_Details WHERE commande_detail_id = ?",
      [req.params.id]
    );
    if (!detail)
      return res.status(404).json({ error: "Détail de commande non trouvé" });
    res.status(200).json(detail);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du détail de commande" });
  } finally {
    db.close();
  }
};

// Créer un nouveau détail de commande
export const createCommandeDetail = async (req: Request, res: Response) => {
  const { commande_id, plat_id, quantite } = req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `INSERT INTO Commande_Details (commande_id, plat_id, quantite) VALUES (?, ?, ?)`,
      [commande_id, plat_id, quantite]
    );
    res.status(201).json({
      commande_detail_id: result.lastID,
      commande_id,
      plat_id,
      quantite,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création du détail de commande" });
  } finally {
    db.close();
  }
};

// Mettre à jour un détail de commande
export const updateCommandeDetail = async (req: Request, res: Response) => {
  const { commande_id, plat_id, quantite } = req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `UPDATE Commande_Details SET commande_id = ?, plat_id = ?, quantite = ? WHERE commande_detail_id = ?`,
      [commande_id, plat_id, quantite, req.params.id]
    );
    if (result.changes === 0)
      return res.status(404).json({ error: "Détail de commande non trouvé" });
    res
      .status(200)
      .json({ message: "Détail de commande mis à jour avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du détail de commande" });
  } finally {
    db.close();
  }
};

// Supprimer un détail de commande
export const deleteCommandeDetail = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const result = await db.run(
      `DELETE FROM Commande_Details WHERE commande_detail_id = ?`,
      [req.params.id]
    );
    if (result.changes === 0)
      return res.status(404).json({ error: "Détail de commande non trouvé" });
    res
      .status(200)
      .json({ message: "Détail de commande supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du détail de commande" });
  } finally {
    db.close();
  }
};
