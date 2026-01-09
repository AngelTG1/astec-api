import { Router } from "express";
import { authMiddleware } from "../../../auth/infraestructure/middleware/authMiddleware";
import { adminOnlyMiddleware } from "../../../auth/infraestructure/middleware/adminOnlyMiddleware";
import { createClientController, getAllClientsController, getClientByUuidController, updateClientController } from "../dependence";

const router = Router();

// Crear cliente
router.post("/", authMiddleware, adminOnlyMiddleware, (req, res) =>
  createClientController.handle(req, res)
);

router.get("/", authMiddleware, (req, res) =>
  getAllClientsController.handle(req, res)
);

router.get("/:id", authMiddleware, (req, res) =>
  getClientByUuidController.handle(req, res)
);

router.patch("/:uuid", authMiddleware, adminOnlyMiddleware, (req, res) =>
  updateClientController.handle(req, res)
);

export default router;
