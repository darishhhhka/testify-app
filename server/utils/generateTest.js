import { Question, Test, TestQuestion } from "../models/models.js";

export async function generateTest(countQuestion, themeId, userId, name) {
  try {
    const test = await Test.create({ userId, name });
    const allQuestion = await Question.findAll({ where: { themeId } });
    const question = getRandom(allQuestion, countQuestion);
    console.log("countQuestion", countQuestion);
    question.forEach(async (q) => {
      await TestQuestion.create({
        testId: test.dataValues.id,
        questionId: q.dataValues.id,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

const getRandom = (arr, k) => {
  const arr1 = [...arr];
  for (let i = arr1.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr1[j], arr1[i]] = [arr1[i], arr1[j]];
  }
  console.log("Готовые тесты ", arr1.slice(0, k));

  return arr1.slice(0, k);
};
