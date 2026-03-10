import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcrypt";
import { AuthRequest } from "../middleware/auth.middleware";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "User creation failed" });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);

    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(user.id, user.role);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  // Check admin or user
  if (req.user.role !== "admin" && req.user.userId !== id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
}