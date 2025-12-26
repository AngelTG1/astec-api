import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  updateUserController,
  getAllUsersController
} from "../dependence";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminOnlyMiddleware } from "../middleware/adminOnlyMiddleware";

const router = Router();

// Solo admin puede crear usuarios
router.post("/register", authMiddleware, adminOnlyMiddleware, (req, res) =>
  registerUserController.handle(req, res)
);

// Login general
router.post("/login", (req, res) =>
  loginUserController.handle(req, res)
);

// Actualizar datos propios
router.patch("/me", authMiddleware, (req, res) =>
  updateUserController.handle(req, res)
);

// Listar usuarios (solo admin)
router.get("/users", authMiddleware, adminOnlyMiddleware, (req, res) =>
  getAllUsersController.handle(req, res)
);

export default router;
