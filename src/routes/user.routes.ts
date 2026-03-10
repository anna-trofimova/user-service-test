import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/role.middleware";
import {
  register,
  login,
  getUser,
  listUsers,
  blockUserController
} from "../controllers/user.controller";

const router = Router();

router.post("/register", register)
router.post("/login", login);;
router.get("/users/:id", authMiddleware, getUser);
router.get("/users", authMiddleware, adminOnly, listUsers);
router.patch("/users/:id/block", authMiddleware, blockUserController);

export default router;