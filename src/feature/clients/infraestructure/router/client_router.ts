import { Router } from "express";
import { createClientController, getAllClientsController, getClientByUuidController,  } from "../dependence";

const router = Router();

// Crear cliente
router.post("/", (req, res) => createClientController.handle(req, res));

router.get("/", (req, res) => getAllClientsController.handle(req, res));

router.get("/:id", (req, res) => getClientByUuidController.handle(req, res));

export default router;
