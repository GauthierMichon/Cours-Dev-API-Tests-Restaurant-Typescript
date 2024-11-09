const request = require("supertest");
const express = require("express");

import tableRoutes from "../routes/tableRoutes";
import { initDB } from "../database/database";

jest.mock("../database/database"); // Force Jest à utiliser le mock

const mockDBInstance = {
  all: jest.fn(),
  get: jest.fn(),
  run: jest.fn(),
  close: jest.fn(),
};

(initDB as jest.Mock).mockResolvedValue(mockDBInstance); // Retourne l'instance mockée

const app = express();
app.use(express.json());
app.use("/api/tables", tableRoutes);

describe("Table Routes", () => {
  let dbMock: any;

  beforeEach(async () => {
    dbMock = await initDB(); // Initialiser le mock de la base de données

    // Vérifiez que `dbMock` contient bien les méthodes mockées
    if (!dbMock.all || !dbMock.get || !dbMock.run) {
      throw new Error(
        "Le mock de la base de données n'a pas été correctement configuré."
      );
    }
  });

  afterEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks après chaque test
  });

  it("GET /api/tables - should return all tables", async () => {
    dbMock.all.mockResolvedValue([
      { table_id: 1, numero_table: 101, capacite: 4, emplacement: "Intérieur" },
      { table_id: 2, numero_table: 102, capacite: 2, emplacement: "Extérieur" },
    ]);

    const res = await request(app).get("/api/tables");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { table_id: 1, numero_table: 101, capacite: 4, emplacement: "Intérieur" },
      { table_id: 2, numero_table: 102, capacite: 2, emplacement: "Extérieur" },
    ]);
  });

  it("GET /api/tables/:id - should return a table by ID", async () => {
    dbMock.get.mockResolvedValue({
      table_id: 1,
      numero_table: 101,
      capacite: 4,
      emplacement: "Intérieur",
    });

    const res = await request(app).get("/api/tables/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      table_id: 1,
      numero_table: 101,
      capacite: 4,
      emplacement: "Intérieur",
    });
  });

  it("POST /api/tables - should create a new table", async () => {
    dbMock.run.mockResolvedValue({ lastID: 3 });

    const newTable = {
      numero_table: 103,
      capacite: 6,
      emplacement: "Terrasse",
    };
    const res = await request(app).post("/api/tables").send(newTable);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ table_id: 3, ...newTable });
  });

  it("PUT /api/tables/:id - should update a table by ID", async () => {
    dbMock.run.mockResolvedValue({ changes: 1 });

    const updatedTable = { numero_table: 104, capacite: 8, emplacement: "VIP" };
    const res = await request(app).put("/api/tables/1").send(updatedTable);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Table mise à jour avec succès" });
  });

  it("DELETE /api/tables/:id - should delete a table by ID", async () => {
    dbMock.run.mockResolvedValue({ changes: 1 });

    const res = await request(app).delete("/api/tables/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Table supprimée avec succès" });
  });
});
