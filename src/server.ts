const express = require("express");
import * as dotenv from "dotenv";
import { initDB } from "./database/database";
import clientRoutes from "./routes/clientRoutes";
import employeRoutes from "./routes/employeRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import commandeDetailRoutes from "./routes/commandeDetailRoutes";
import menuRoutes from "./routes/menuRoutes";
import tableRoutes from "./routes/tableRoutes";
import commandeRoutes from "./routes/commandeRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/employes", employeRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/commandeDetails", commandeDetailRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/commanded", commandeRoutes);

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
