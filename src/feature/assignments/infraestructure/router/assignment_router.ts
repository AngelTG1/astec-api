import { Router } from "express";
import {
  createAssignmentController,
  getAllAssignmentsController,
  getAssignmentByUuidController,
  getAssignmentsByApostamientoController,
  getAssignmentsByEmpleadoController
} from "../dependence";
import { authMiddleware } from "../../../auth/infraestructure/middleware/authMiddleware";

const router = Router();

router.post("/",authMiddleware, (req, res) => createAssignmentController.handle(req, res));

router.get("/",authMiddleware, (req, res) => getAllAssignmentsController.handle(req, res));

router.get("/:uuid",authMiddleware, (req, res) => getAssignmentByUuidController.handle(req, res));

router.get("/apostamiento/:uuid",authMiddleware, (req, res) =>
  getAssignmentsByApostamientoController.handle(req, res)
);

router.get("/empleado/:uuid",authMiddleware, (req, res) =>
  getAssignmentsByEmpleadoController.handle(req, res)
);

export default router;
