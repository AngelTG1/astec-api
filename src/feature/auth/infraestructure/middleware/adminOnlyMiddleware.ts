import { Request, Response, NextFunction } from "express";

export function adminOnlyMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (!user || user.rol !== "admin") {
    return res.status(403).json({ error: "Solo admin puede crear usuarios" });
  }

  next();
}
