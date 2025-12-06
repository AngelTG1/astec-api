import { Router } from "express";
import {
  createApostamientoController,
  getAllApostamientosController,
  getApostamientoByUuidController,
  getApostamientosByClientController
} from "../dependence";
import { authMiddleware } from "../../../auth/infraestructure/middleware/authMiddleware";


const router = Router();

router.post("/",authMiddleware, (req, res) => createApostamientoController.handle(req, res));

router.get("/",authMiddleware, (req, res) => getAllApostamientosController.handle(req, res));

router.get("/:uuid",authMiddleware, (req, res) => getApostamientoByUuidController.handle(req, res));

router.get("/cliente/:clientUuid",authMiddleware, (req, res) =>
  getApostamientosByClientController.handle(req, res)
);

export default router;
