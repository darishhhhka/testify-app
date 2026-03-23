import { Answer, Question, Theme } from "../models/models.js";

export async function importTest(data, userId) {
  try {
    for (const test of data) {
      const theme = await Theme.findOne({
        where: { theme: test.name, userId },
      });

      let themeId;
      if (theme === null) {
        themeId = (await Theme.create({ theme: test.name, userId })).dataValues
          .id;
      } else {
        themeId = theme.dataValues.id;
      }
      for (const q of test.questions) {
        const question = await Question.create({
          question: q.text,
          type: q.type,
          themeId,
        });

        for (const a of q.answers) {
          await Answer.create({
            questionId: question.dataValues.id,
            text: a.answer,
            correct: a.isCorrect,
          });
        }
      }
    }
  } catch (error) {
    console.log("errrrror ", error);
  }
}
