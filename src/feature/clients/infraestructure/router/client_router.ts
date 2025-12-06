import { Router } from "express";
import { authMiddleware } from "../../../auth/infraestructure/middleware/authMiddleware";
import { createClientController, getAllClientsController, getClientByUuidController,  } from "../dependence";

const router = Router();

// Crear cliente
router.post("/",authMiddleware, (req, res) => createClientController.handle(req, res));

router.get("/",authMiddleware, (req, res) => getAllClientsController.handle(req, res));

router.get("/:id",authMiddleware, (req, res) => getClientByUuidController.handle(req, res));

export default router;
