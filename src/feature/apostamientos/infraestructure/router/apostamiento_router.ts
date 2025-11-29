import { Router } from "express";
import {
  createApostamientoController,
  getAllApostamientosController,
  getApostamientoByUuidController,
  getApostamientosByClientController
} from "../dependence";

const router = Router();

router.post("/", (req, res) => createApostamientoController.handle(req, res));

router.get("/", (req, res) => getAllApostamientosController.handle(req, res));

router.get("/:uuid", (req, res) => getApostamientoByUuidController.handle(req, res));

router.get("/cliente/:clientUuid", (req, res) =>
  getApostamientosByClientController.handle(req, res)
);

export default router;
