import { Router } from "express";
import { userRouter } from "./userRouter.js";
import { testRouter } from "./testRouter.js";
import { answerRouter } from "./answerRouter.js";
import { questionRouter } from "./questionRouter.js";
import { testAttempRouter } from "./testAttempRouter.js";
import { userAnswerRouter } from "./userAnswerRouter.js";

const router = new Router();
router.use("/user", userRouter);
router.use("/test", testRouter);
router.use("/answer", answerRouter);
router.use("/question", questionRouter);
router.use("/test-attemp", testAttempRouter);
router.use("/user-answer", userAnswerRouter);

export { router };
