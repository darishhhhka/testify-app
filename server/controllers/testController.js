import { Test, Theme, TestAttemp, Question, Answer } from "../models/models.js";
import { ApiError } from "../error/ApiError.js";
import { sequelize } from "../db.js";
import { txtParser } from "../utils/parser/txtParser.js";
import { importTest } from "../utils/importTest.js";
import { generateTest } from "../utils/generateTest.js";

class TestController {
  async create(req, res) {
    const userId = req.user.id;
    console.log(userId, "юзер айди");
    const { name, countQustion, themeId } = req.body;
    console.log("TThemeId: ", themeId);

    generateTest(countQustion, themeId, userId, name);
    console.log("countQustion", countQustion);

    // const test = await Test.create({ usesrId, name });
    return res.json({ message: "ok" });
  }

  async createTheme(req, res, next) {
    try {
      const { theme, userId } = req.body;
      const newTheme = await Theme.create({ theme, userId });
      return res.json(newTheme);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getTheme(req, res, next) {
    try {
      const { theme } = req.query;
      const themeId = await Theme.findOne({ where: { theme } });
      return res.json(themeId);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getAllTheme(req, res, next) {
    try {
      const userId = req.user.id;
      console.log("userIdinController", userId);

      const themes = await Theme.findAll({
        where: { userId },
        attributes: ["id", "theme"],
      });
      return res.json(themes);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getMyTests(req, res, next) {
    try {
      const { userId } = req.query;
      const tests = await Test.findAll({
        where: { userId },
        attributes: {
          include: [
            [
              sequelize.fn("COUNT", sequelize.col("testAttemps.id")),
              "participantsCount",
            ],
          ],
        },
        include: [
          {
            model: TestAttemp,
            attributes: [],
            required: false,
          },
        ],
        group: ["test.id"],
      });
      const result = tests.map((t) => ({ ...t.toJSON(), type: "created" }));

      return res.json(result);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getPassedTests(req, res, next) {
    try {
      const { userId } = req.query;

      const tests = await TestAttemp.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });

      const uniqueTests = new Map();

      for (const t of tests) {
        const testId = t.snapshot?.testId;

        if (!uniqueTests.has(testId)) {
          uniqueTests.set(testId, t);
        }
      }

      const result = Array.from(uniqueTests.values()).map((t) => {
        const snapshot = t.snapshot;

        return {
          testId: snapshot?.testId,
          testAttemptId: t.id,
          name: snapshot?.name,
          score: t.score,
          updatedAt: t.createdAt,
          countQuestion: snapshot?.questions?.length || 0,
          type: "passed",
        };
      });

      return res.json(result);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getTestById(req, res, next) {
    try {
      const { testId, includeAnswers } = req.query;

      const answersAttributes =
        includeAnswers === "true" ? ["id", "text", "correct"] : ["id", "text"];

      const test = await Test.findOne({
        where: { id: testId },
        include: [
          {
            model: Question,
            through: { attributes: [] },
            include: [
              {
                model: Answer,
                attributes: answersAttributes,
              },
            ],
          },
        ],
      });

      if (!test) {
        return res.status(404).json({ message: "Тест не найден" });
      }

      return res.json(test);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getAll(req, res) {
    let tests;
    let { userId, testId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    if (userId) {
      tests = await Test.findAll({
        where: { userId },
        limit,
        offset,
      });
    }
    if (testId) {
      tests = await Test.findAll({
        where: {
          testId: {
            [Op.in]: testId,
          },
        },
        limit,
        offset,
      });
    }

    return res.json(tests);
  }

  async deleteTest(req, res) {
    const { testId } = req.query;
    await Test.destroy({ where: { id: testId } });
    return res.json({ message: "Тест успешно удален", testId });
  }

  async uploadTest(req, res, next) {
    try {
      const userId = req.user.id;

      console.log("Отработала загррузка фалйа");
      const file = req.file;
      const text = file.buffer.toString();
      const data = txtParser(text);
      await importTest(data, userId);
      return res.json({ message: "ok" });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

export default new TestController();
