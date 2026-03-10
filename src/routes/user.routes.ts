import { Router } from "express";
import { register, login } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUser } from "../controllers/user.controller";

const router = Router();

router.post("/register", register)
router.post("/login", login);;
router.get("/users/:id", authMiddleware, getUser);

export default router;