import { Router } from "express";
import {
  registerUserController,
  loginUserController
} from "../dependence";

const router = Router();

// Solo admin puede crear usuarios
router.post("/register", (req, res) =>
  registerUserController.handle(req, res)
);

// Login general
router.post("/login", (req, res) =>
  loginUserController.handle(req, res)
);

export default router;
