import {
  TestAttemp,
  Test,
  Question,
  Answer,
  UserAnswer,
  User,
} from "../models/models.js";
import { ApiError } from "../error/ApiError.js";
import { Op } from "sequelize";

class TestAttempController {
  async create(req, res, next) {
    try {
      const userAnswerForBd = [];
      const userId = req.user.id;
      const { testId, answer } = req.body;
      const test = await Test.findByPk(testId);

      const questions = await Question.findAll({
        include: [
          { model: Answer },
          {
            model: Test,
            where: { id: testId },
            attributes: [],
            through: { attributes: [] },
          },
        ],
      });
      let score = 0;
      const snapshotQuestions = [];

      for (const q of questions) {
        let isCorrect = false;
        const userAnswer = answer[q.id];

        if (
          q.type === "text" &&
          typeof userAnswer === "string" &&
          q.answers[0].text.trim().toLowerCase() ===
            userAnswer.trim().toLowerCase()
        ) {
          score += 1;
          isCorrect = true;
        } else {
          const correctAnswer = q.answers
            .filter((a) => a.correct)
            .map((a) => a.id);

          const percent = 1 / correctAnswer.length;

          if (Array.isArray(userAnswer)) {
            let localScore = 0;

            correctAnswer.forEach((a) => {
              if (userAnswer.includes(a)) {
                localScore += percent;
              } else {
                localScore -= percent;
              }
            });

            localScore = Math.round(localScore * 100) / 100;

            if (localScore > 0) {
              score += localScore;
              isCorrect = true;
            }
          } else {
            if (correctAnswer.includes(userAnswer)) {
              score += 1;
              isCorrect = true;
            }
          }
        }

        userAnswerForBd.push({
          questionId: q.id,
          isCorrect,
          value: userAnswer,
        });

        snapshotQuestions.push({
          id: q.id,
          question: q.question,
          type: q.type,
          answers: q.answers.map((a) => ({
            id: a.id,
            text: a.text,
          })),
          userAnswer: {
            value: userAnswer,
            isCorrect,
          },
        });
      }

      if (userAnswerForBd === undefined) {
        userAnswerForBd.push({
          isCorrect: false,
        });
      }

      const snapshot = {
        testId,
        name: test.name,
        questions: snapshotQuestions,
        createdAt: new Date(),
      };

      const testAttemp = await TestAttemp.create({
        testId,
        userId,
        score: Math.round(score * 100) / 100,
        snapshot,
      });

      await UserAnswer.bulkCreate(
        userAnswerForBd.map((a) => ({
          testId,
          userId,
          questionId: a.questionId,
          testAttempId: testAttemp.id,
          value: a.value,
          isCorrect: a.isCorrect,
        })),
      );

      return res.json({ message: "ok" });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
  async getTestAttempt(req, res, next) {
    try {
      const { testAttempId } = req.query;

      const attempt = await TestAttemp.findByPk(testAttempId, {
        attributes: ["id", "score"],

        include: [
          {
            model: Test,
            attributes: ["name"],
            include: [
              {
                model: Question,
                attributes: ["id", "question"],
                include: [
                  {
                    model: Answer,
                    attributes: ["id", "text", "correct"],
                  },
                  {
                    model: UserAnswer,
                    attributes: ["id", "value", "isCorrect"],
                    where: {
                      testAttempId,
                    },
                    required: false,
                  },
                ],
              },
            ],
          },
        ],
      });

      return res.json(attempt);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

export default new TestAttempController();
