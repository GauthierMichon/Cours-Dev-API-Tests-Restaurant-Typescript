import { Request, Response } from "express";
import { initDB } from "../database/database";
import { IEmploye } from "../models/IEmploye";

export const getEmployes = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const employes = await db.all<IEmploye[]>("SELECT * FROM Employes");
    res.status(200).json(employes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des employés" });
  } finally {
    db.close();
  }
};

// Récupérer un employé par ID
export const getEmployeById = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const employe = await db.get<IEmploye>(
      "SELECT * FROM Employes WHERE employe_id = ?",
      [req.params.id]
    );
    if (!employe) return res.status(404).json({ error: "Employé non trouvé" });
    res.status(200).json(employe);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'employé" });
  } finally {
    db.close();
  }
};

// Créer un nouvel employé
export const createEmploye = async (req: Request, res: Response) => {
  const { nom, prenom, poste, salaire, date_embauche } = req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `INSERT INTO Employes (nom, prenom, poste, salaire, date_embauche) VALUES (?, ?, ?, ?, ?)`,
      [nom, prenom, poste, salaire, date_embauche]
    );
    res.status(201).json({
      employe_id: result.lastID,
      nom,
      prenom,
      poste,
      salaire,
      date_embauche,
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de l'employé" });
  } finally {
    db.close();
  }
};

// Mettre à jour un employé par ID
export const updateEmploye = async (req: Request, res: Response) => {
  const { nom, prenom, poste, salaire, date_embauche } = req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `UPDATE Employes SET nom = ?, prenom = ?, poste = ?, salaire = ?, date_embauche = ? WHERE employe_id = ?`,
      [nom, prenom, poste, salaire, date_embauche, req.params.id]
    );
    if (result.changes === 0)
      return res.status(404).json({ error: "Employé non trouvé" });
    res.status(200).json({ message: "Employé mis à jour avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'employé" });
  } finally {
    db.close();
  }
};

// Supprimer un employé par ID
export const deleteEmploye = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const result = await db.run(`DELETE FROM Employes WHERE employe_id = ?`, [
      req.params.id,
    ]);
    if (result.changes === 0)
      return res.status(404).json({ error: "Employé non trouvé" });
    res.status(200).json({ message: "Employé supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'employé" });
  } finally {
    db.close();
  }
};
