import { Answer } from "../models/models.js";
import { ApiError } from "../error/ApiError.js";

class AnswerController {
  async create(req, res, next) {
    try {
      const { questionId, text, is_correct } = req.body;
      const answer = await Answer.create({ text, is_correct, questionId });
      return res.json(answer);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    const { questionId } = req.query;
    const answers = await Answer.findAll({ where: { questionId } });
    return res.json(answers);
  }
}

export default new AnswerController();
