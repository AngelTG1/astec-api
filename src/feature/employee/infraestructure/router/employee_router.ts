import { Router } from "express";
import { 
  createEmployeeController,
  getEmployeeByUuidController,
  getAllEmployeesController
} from "../dependence";

const router = Router();

// Crear
router.post("/", (req, res) => createEmployeeController.handle(req, res));

// Obtener todos
router.get("/", (req, res) => getAllEmployeesController.handle(req, res));

// Obtener por UUID
router.get("/:uuid", (req, res) => getEmployeeByUuidController.handle(req, res));

export default router;
