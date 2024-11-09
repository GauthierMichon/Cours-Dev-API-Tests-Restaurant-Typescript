import { Request, Response } from "express";
import { initDB } from "../database/database";
import { IClient } from "../models/IClient";

// Créer un nouveau client
export const createClient = async (req: Request, res: Response) => {
  const { nom, prenom, telephone, email } = req.body;
  const db = await initDB();

  try {
    const result = await db.run(
      `INSERT INTO Clients (nom, prenom, telephone, email) VALUES (?, ?, ?, ?)`,
      [nom, prenom, telephone, email]
    );
    res
      .status(201)
      .json({ client_id: result.lastID, nom, prenom, telephone, email });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du client" });
  } finally {
    db.close();
  }
};

// Récupérer tous les clients
export const getClients = async (req: Request, res: Response) => {
  const db = await initDB();

  try {
    const clients = await db.all<IClient[]>("SELECT * FROM Clients");
    res.status(200).json(clients);
  } catch (error) {
    console.error("Erreur exacte de la base de données :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des clients" });
  } finally {
    db.close();
  }
};

// Récupérer un client par ID
export const getClientById = async (req: Request, res: Response) => {
  const db = await initDB();

  try {
    const client = await db.get<IClient>(
      "SELECT * FROM Clients WHERE client_id = ?",
      [req.params.id]
    );
    if (!client) return res.status(404).json({ error: "Client non trouvé" });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du client" });
  } finally {
    db.close();
  }
};

// Mettre à jour un client par ID
export const updateClient = async (req: Request, res: Response) => {
  const { nom, prenom, telephone, email } = req.body;
  const db = await initDB();
  try {
    const result = await db.run(
      `UPDATE Clients SET nom = ?, prenom = ?, telephone = ?, email = ? WHERE client_id = ?`,
      [nom, prenom, telephone, email, req.params.id]
    );
    if (result.changes === 0)
      return res.status(404).json({ error: "Client non trouvé" });
    res.status(200).json({ message: "Client mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du client" });
  } finally {
    db.close();
  }
};

// Supprimer un client par ID
export const deleteClient = async (req: Request, res: Response) => {
  const db = await initDB();
  try {
    const result = await db.run(`DELETE FROM Clients WHERE client_id = ?`, [
      req.params.id,
    ]);
    if (result.changes === 0)
      return res.status(404).json({ error: "Client non trouvé" });
    res.status(200).json({ message: "Client supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du client" });
  } finally {
    db.close();
  }
};
