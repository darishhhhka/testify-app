import { Router } from "express";
import AnswerController from "../controllers/answerController.js";
const router = new Router();

router.post("/", AnswerController.create);
router.get("/", AnswerController.getAll);

export { router as answerRouter };
