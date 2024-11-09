import { Request, Response } from "express";
import { initDB } from "../database/database";
import { IMenu } from "../models/IMenu";

// Récupérer tous les plats
export const getMenus = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const menus = await db.all<IMenu[]>("SELECT * FROM Menu");
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des plats" });
  } finally {
    db.close();
  }
};

// Récupérer un plat par ID
export const getMenuById = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const menu = await db.get<IMenu>("SELECT * FROM Menu WHERE plat_id = ?", [
      req.params.id,
    ]);
    if (!menu) return res.status(404).json({ error: "Plat non trouvé" });
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du plat" });
  } finally {
    db.close();
  }
};

// Créer un nouveau plat
export const createMenu = async (req: Request, res: Response) => {
  const { nom_plat, description, prix, categorie } = req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `INSERT INTO Menu (nom_plat, description, prix, categorie) VALUES (?, ?, ?, ?)`,
      [nom_plat, description, prix, categorie]
    );
    res
      .status(201)
      .json({ plat_id: result.lastID, nom_plat, description, prix, categorie });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du plat" });
  } finally {
    db.close();
  }
};

// Mettre à jour un plat
export const updateMenu = async (req: Request, res: Response) => {
  const { nom_plat, description, prix, categorie } = req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `UPDATE Menu SET nom_plat = ?, description = ?, prix = ?, categorie = ? WHERE plat_id = ?`,
      [nom_plat, description, prix, categorie, req.params.id]
    );
    if (result.changes === 0)
      return res.status(404).json({ error: "Plat non trouvé" });
    res.status(200).json({ message: "Plat mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du plat" });
  } finally {
    db.close();
  }
};

// Supprimer un plat
export const deleteMenu = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const result = await db.run(`DELETE FROM Menu WHERE plat_id = ?`, [
      req.params.id,
    ]);
    if (result.changes === 0)
      return res.status(404).json({ error: "Plat non trouvé" });
    res.status(200).json({ message: "Plat supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du plat" });
  } finally {
    db.close();
  }
};
