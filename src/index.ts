import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import clientRouter from './feature/clients/infraestructure/router/client_router'
import employeeRouter from "./feature/employee/infraestructure/router/employee_router";
import apostamientoRouter from "./feature/apostamientos/infraestructure/router/apostamiento_router";
import assignmentRouter from "./feature/assignments/infraestructure/router/assignment_router";
import authRouter from "./feature/auth/infraestructure/router/auth_router";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/clients", clientRouter);
app.use("/employees", employeeRouter);
app.use("/apostamientos", apostamientoRouter);
app.use("/assignments", assignmentRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en http://localhost:${PORT}`);
});
