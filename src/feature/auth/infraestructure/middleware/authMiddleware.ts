import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwtService";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Token requerido" });

    const decoded = JwtService.verify(token);

    (req as any).user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
