// interface Question {
//   type: string;
//   text: string;
//   answers: Answer[];
// }

// interface Answer {
//   answer: string;
//   isCorrect: boolean;
// }

// export interface Test {
//   name: string;
//   questions: Question[];
// }

export function txtParser(text) {
  let currentSection = null;
  let currentQuestion = null;
  let currentTest = null;
  const res = [];
  const lines = text.split(/\r?\n/).map((l) => l.trim());
  console.log(lines);

  try {
    for (const line of lines) {
      if (line === "#TEST") {
        if (currentTest) {
          res.push(currentTest);
        }
        currentSection = "test";
        currentTest = {};
        continue;
      }
      if (line === "#QUESTION") {
        if (currentQuestion && currentTest) {
          currentTest.questions.push(currentQuestion);
        }
        currentSection = "question";
        currentQuestion = { type: "", text: "", answers: [] };
        continue;
      }

      if (currentSection === "test") {
        const name = line.split("name:")[1].trim();
        currentTest = { name, questions: [] };
        currentSection = null;
        continue;
      }

      if (currentSection === "question" && currentQuestion) {
        if (line.startsWith("type")) {
          const type = line.split("type:")[1].trim();
          currentQuestion.type = type;
          continue;
        }
        if (line.startsWith("text")) {
          const text = line.split("text:")[1].trim();
          currentQuestion.text = text;
          continue;
        }
        if (line.startsWith("-")) {
          let answer = line.split("-")[1].trim();
          let isCorrect = false;
          const lastSymbol = answer.split("");
          if (lastSymbol[lastSymbol.length - 1] === "*") {
            isCorrect = true;
            answer = lastSymbol.slice(0, lastSymbol.length - 1).join("");
          }
          currentQuestion.answers.push({ answer, isCorrect });
          continue;
        }
        if (line.startsWith("answer")) {
          const answer = line.split("answer:")[1].trim();
          currentQuestion.answers.push({ answer, isCorrect: true });
          continue;
        }
        currentTest.questions.push(currentQuestion);
        currentQuestion = null;
        currentSection = null;
      }
    }
    if (currentQuestion !== null) {
      currentTest.questions.push(currentQuestion);
    }
    if (currentTest !== null) {
      res.push(currentTest);
    }
    // console.log("Готовые вопросы", res);

    return res;
  } catch (error) {
    console.log(error);
  }
}
