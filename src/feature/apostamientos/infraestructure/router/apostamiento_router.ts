import { Router } from "express";
import {
  createApostamientoController,
  getAllApostamientosController,
  getApostamientoByUuidController,
  getApostamientosByClientController
} from "../dependence";
import { authMiddleware } from "../../../auth/infraestructure/middleware/authMiddleware";
import { adminOnlyMiddleware } from "../../../auth/infraestructure/middleware/adminOnlyMiddleware";


const router = Router();

router.post("/", authMiddleware, adminOnlyMiddleware, (req, res) =>
  createApostamientoController.handle(req, res)
);

router.get("/", authMiddleware, adminOnlyMiddleware, (req, res) =>
  getAllApostamientosController.handle(req, res)
);

router.get("/:uuid", authMiddleware, adminOnlyMiddleware, (req, res) =>
  getApostamientoByUuidController.handle(req, res)
);

router.get("/cliente/:clientUuid", authMiddleware, adminOnlyMiddleware, (req, res) =>
  getApostamientosByClientController.handle(req, res)
);

export default router;
