import { Request, Response } from "express";
import { initDB } from "../database/database";
import { ITable } from "../models/ITable";

// Récupérer toutes les tables
export const getTables = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const tables = await db.all<ITable[]>("SELECT * FROM Tables");
    res.status(200).json(tables);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tables" });
  } finally {
    db.close();
  }
};

// Récupérer une table par ID
export const getTableById = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const table = await db.get<ITable>(
      "SELECT * FROM Tables WHERE table_id = ?",
      [req.params.id]
    );
    if (!table) return res.status(404).json({ error: "Table non trouvée" });
    res.status(200).json(table);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la table" });
  } finally {
    db.close();
  }
};

// Créer une nouvelle table
export const createTable = async (req: Request, res: Response) => {
  const { numero_table, capacite, emplacement } = req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `INSERT INTO Tables (numero_table, capacite, emplacement) VALUES (?, ?, ?)`,
      [numero_table, capacite, emplacement]
    );
    res
      .status(201)
      .json({ table_id: result.lastID, numero_table, capacite, emplacement });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de la table" });
  } finally {
    db.close();
  }
};

// Mettre à jour une table par ID
export const updateTable = async (req: Request, res: Response) => {
  const { numero_table, capacite, emplacement } = req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `UPDATE Tables SET numero_table = ?, capacite = ?, emplacement = ? WHERE table_id = ?`,
      [numero_table, capacite, emplacement, req.params.id]
    );
    if (result.changes === 0)
      return res.status(404).json({ error: "Table non trouvée" });
    res.status(200).json({ message: "Table mise à jour avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la table" });
  } finally {
    db.close();
  }
};

// Supprimer une table par ID
export const deleteTable = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const result = await db.run(`DELETE FROM Tables WHERE table_id = ?`, [
      req.params.id,
    ]);
    if (result.changes === 0)
      return res.status(404).json({ error: "Table non trouvée" });
    res.status(200).json({ message: "Table supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la table" });
  } finally {
    db.close();
  }
};
