import { Router } from "express";
import UserAnswerController from "../controllers/userAnswerController.js";
const router = new Router();

router.post("/", UserAnswerController.create);

export { router as userAnswerRouter };
