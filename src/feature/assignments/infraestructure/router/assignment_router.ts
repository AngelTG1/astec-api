import { Router } from "express";
import {
  createAssignmentController,
  getAllAssignmentsController,
  getAssignmentByUuidController,
  getAssignmentsByApostamientoController,
  getAssignmentsByEmpleadoController
} from "../dependence";

const router = Router();

router.post("/", (req, res) => createAssignmentController.handle(req, res));

router.get("/", (req, res) => getAllAssignmentsController.handle(req, res));

router.get("/:uuid", (req, res) => getAssignmentByUuidController.handle(req, res));

router.get("/apostamiento/:uuid", (req, res) =>
  getAssignmentsByApostamientoController.handle(req, res)
);

router.get("/empleado/:uuid", (req, res) =>
  getAssignmentsByEmpleadoController.handle(req, res)
);

export default router;
