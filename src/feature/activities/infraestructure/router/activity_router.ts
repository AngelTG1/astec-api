import { Router } from "express";
import { authMiddleware } from "../../../auth/infraestructure/middleware/authMiddleware";
import {
  createActivityController,
  getActivitiesByClientController,
  getActivitiesByEmpleadoController,
  getActivityByUuidController,
  getAllActivitiesController,
  getEmployeesByClientController,
  getClientsWithAttendanceController
} from "../dependence";

const router = Router();

router.post("/", authMiddleware, (req, res) =>
  createActivityController.handle(req, res)
);

router.get("/", authMiddleware, (req, res) =>
  getAllActivitiesController.handle(req, res)
);

router.get("/client/:uuid", authMiddleware, (req, res) =>
  getActivitiesByClientController.handle(req, res)
);

router.get("/client/:uuid/employees", authMiddleware, (req, res) =>
  getEmployeesByClientController.handle(req, res)
);

router.get("/employee/:uuid", authMiddleware, (req, res) =>
  getActivitiesByEmpleadoController.handle(req, res)
);

router.get("/clients-with-attendance", authMiddleware, (req, res) =>
  getClientsWithAttendanceController.handle(req, res)
);

router.get("/:uuid", authMiddleware, (req, res) =>
  getActivityByUuidController.handle(req, res)
);

export default router;
