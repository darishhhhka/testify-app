import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { authMiddleware } from "../miadleware/authMiddleware.js";
const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);

export { router as userRouter };
