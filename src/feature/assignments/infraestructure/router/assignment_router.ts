import { Router } from "express";
import {
  createAssignmentController,
  getAllAssignmentsController,
  getAssignmentByUuidController,
  getAssignmentsByApostamientoController,
  getAssignmentsByEmpleadoController
} from "../dependence";
import { authMiddleware } from "../../../auth/infraestructure/middleware/authMiddleware";
import { adminOnlyMiddleware } from "../../../auth/infraestructure/middleware/adminOnlyMiddleware";

const router = Router();

router.post("/", authMiddleware, adminOnlyMiddleware, (req, res) =>
  createAssignmentController.handle(req, res)
);

router.get("/", authMiddleware, adminOnlyMiddleware, (req, res) =>
  getAllAssignmentsController.handle(req, res)
);

router.get("/:uuid", authMiddleware, adminOnlyMiddleware, (req, res) =>
  getAssignmentByUuidController.handle(req, res)
);

router.get("/apostamiento/:uuid", authMiddleware, adminOnlyMiddleware, (req, res) =>
  getAssignmentsByApostamientoController.handle(req, res)
);

router.get("/empleado/:uuid", authMiddleware, adminOnlyMiddleware, (req, res) =>
  getAssignmentsByEmpleadoController.handle(req, res)
);

export default router;
