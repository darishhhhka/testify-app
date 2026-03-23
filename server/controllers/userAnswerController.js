import { ApiError } from "../error/ApiError.js";
import { UserAnswer } from "../models/models.js";

class UserAnswerController {
  async create(req, res, next) {
    try {
      const { testId, userId, questionId, testAttempId, value, isCorrect } =
        req.body;
      const userAnswer = await UserAnswer.create({
        testId,
        userId,
        questionId,
        testAttempId,
        value,
        isCorrect,
      });
      return res.json(userAnswer);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

export default new UserAnswerController();
