import { Router } from "express";
import { 
  createEmployeeController,
  getEmployeeByUuidController,
  getAllEmployeesController
} from "../dependence";
import { authMiddleware } from "../../../auth/infraestructure/middleware/authMiddleware";
import { adminOnlyMiddleware } from "../../../auth/infraestructure/middleware/adminOnlyMiddleware";

const router = Router();

// Crear
router.post("/", authMiddleware, adminOnlyMiddleware, (req, res) =>
  createEmployeeController.handle(req, res)
);

// Obtener todos
router.get("/", authMiddleware, (req, res) =>
  getAllEmployeesController.handle(req, res)
);

// Obtener por UUID
router.get("/:uuid", authMiddleware, (req, res) =>
  getEmployeeByUuidController.handle(req, res)
);

export default router;
