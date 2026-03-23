import { Router } from "express";
import QuestionController from "../controllers/questionController.js";
const router = new Router();

router.post("/", QuestionController.create);
router.get("/", QuestionController.getAll);

export { router as questionRouter };
