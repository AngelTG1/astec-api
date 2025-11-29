import jwt from "jsonwebtoken";

export class JwtService {
  static sign(data: any): string {
    return jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "7d" });
  }

  static verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}
