import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "User creation failed" });
  }
};