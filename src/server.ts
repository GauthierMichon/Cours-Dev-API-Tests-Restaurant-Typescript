const express = require("express");
import * as dotenv from "dotenv";
import { initDB } from "./database/database";
import clientRoutes from "./routes/clientRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/clients", clientRoutes);

const startServer = async () => {
  try {
    await initDB(); // Teste la connexion sans assigner à une variable
    console.log("Connected to SQLite database");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing the database", error);
    process.exit(1);
  }
};

startServer();
