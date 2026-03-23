import { Router } from "express";
import TestAttempController from "../controllers/testAttempController.js";
import { authMiddleware } from "../miadleware/authMiddleware.js";
const router = new Router();

router.post("/", authMiddleware, TestAttempController.create);
router.get("/", TestAttempController.getTestAttempt);

export { router as testAttempRouter };
