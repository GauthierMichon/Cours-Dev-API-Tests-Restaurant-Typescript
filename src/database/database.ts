import { open } from "sqlite";
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

export const initDB = async () => {
  const db = await open({
    filename: path.resolve(__dirname, "restaurant.db"), // Utilise un chemin absolu
    driver: sqlite3.Database,
  });
  return db;
};
