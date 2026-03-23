import { Question } from "../models/models.js";
import { ApiError } from "../error/ApiError.js";

class QuestionController {
  async create(req, res, next) {
    try {
      const { question, type, themeId } = req.body;
      const newQuestion = await Question.create({
        question,
        type,
        themeId,
      });
      return res.json(newQuestion);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
  async getAll(req, res, next) {
    try {
      const { userId } = req.query;
      const question = await Question.findAll({ where: { userId } });
      return res.json(question);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

export default new QuestionController();
