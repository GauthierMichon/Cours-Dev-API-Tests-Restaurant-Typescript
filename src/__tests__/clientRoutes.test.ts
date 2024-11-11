const request = require("supertest");
const express = require("express");

import clientRoutes from "../routes/clientRoutes";
import { initDB } from "../database/database";

jest.mock("../database/database"); // Mock de la base de données

// Mock de l'instance de la base de données
const mockDBInstance = {
  all: jest.fn(),
  get: jest.fn(),
  run: jest.fn(),
  close: jest.fn(),
};

(initDB as jest.Mock).mockResolvedValue(mockDBInstance); // Retourne l'instance mockée pour chaque appel à initDB

const app = express();
app.use(express.json());
app.use("/api/clients", clientRoutes);

describe("Client Routes", () => {
  let dbMock: any;

  beforeEach(async () => {
    dbMock = await initDB();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks après chaque test
  });

  it("GET /api/clients - should return all clients", async () => {
    // Configuration du mock pour retourner une liste de clients
    dbMock.all.mockResolvedValue([
      {
        client_id: 1,
        nom: "Doe",
        prenom: "John",
        telephone: "1234567890",
        email: "john.doe@example.com",
      },
      {
        client_id: 2,
        nom: "Smith",
        prenom: "Jane",
        telephone: "0987654321",
        email: "jane.smith@example.com",
      },
    ]);

    const res = await request(app).get("/api/clients");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        client_id: 1,
        nom: "Doe",
        prenom: "John",
        telephone: "1234567890",
        email: "john.doe@example.com",
      },
      {
        client_id: 2,
        nom: "Smith",
        prenom: "Jane",
        telephone: "0987654321",
        email: "jane.smith@example.com",
      },
    ]);
  });

  it("GET /api/clients/:id - should return a client by ID", async () => {
    // Configuration du mock pour retourner un client spécifique
    dbMock.get.mockResolvedValue({
      client_id: 1,
      nom: "Doe",
      prenom: "John",
      telephone: "1234567890",
      email: "john.doe@example.com",
    });

    const res = await request(app).get("/api/clients/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      client_id: 1,
      nom: "Doe",
      prenom: "John",
      telephone: "1234567890",
      email: "john.doe@example.com",
    });
  });

  it("POST /api/clients - should create a new client", async () => {
    // Configuration du mock pour la création de client
    dbMock.run.mockResolvedValue({ lastID: 3 });

    const newClient = {
      nom: "Doe",
      prenom: "Alice",
      telephone: "1122334455",
      email: "alice.doe@example.com",
    };
    const res = await request(app).post("/api/clients").send(newClient);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ client_id: 3, ...newClient });
  });

  it("PUT /api/clients/:id - should update a client by ID", async () => {
    // Configuration du mock pour la mise à jour de client
    dbMock.run.mockResolvedValue({ changes: 1 });

    const updatedClient = {
      nom: "Doe",
      prenom: "Alice",
      telephone: "5566778899",
      email: "alice.doe@example.com",
    };
    const res = await request(app).put("/api/clients/1").send(updatedClient);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Client mis à jour avec succès" });
  });

  it("DELETE /api/clients/:id - should delete a client by ID", async () => {
    // Configuration du mock pour la suppression de client
    dbMock.run.mockResolvedValue({ changes: 1 });

    const res = await request(app).delete("/api/clients/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Client supprimé avec succès" });
  });
});
