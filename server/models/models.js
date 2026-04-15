import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM("teacher", "student") },
});

const Test = sequelize.define("test", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sharedToken: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING },
});

const TestAttemp = sequelize.define("testAttemp", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  score: { type: DataTypes.FLOAT },
  snapshot: { type: DataTypes.JSONB },
});

const Question = sequelize.define("question", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  question: { type: DataTypes.STRING },
  type: DataTypes.ENUM("single", "multiple", "text"),
});

const Answer = sequelize.define("answer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING },
  correct: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const UserAnswer = sequelize.define("userAnswer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.JSONB },
  isCorrect: { type: DataTypes.BOOLEAN },
});

const Theme = sequelize.define("theme", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  theme: { type: DataTypes.STRING },
});

const TestQuestion = sequelize.define("test-question", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(Test);
Test.belongsTo(User);

Question.hasMany(Answer);
Answer.belongsTo(Question);

User.hasMany(TestAttemp);
TestAttemp.belongsTo(User);

Test.hasMany(TestAttemp);
TestAttemp.belongsTo(Test);

Test.hasMany(UserAnswer);
UserAnswer.belongsTo(Test);

Question.hasOne(UserAnswer);
UserAnswer.belongsTo(Question);

User.hasMany(UserAnswer);
UserAnswer.belongsTo(User);

TestAttemp.hasMany(UserAnswer);
UserAnswer.belongsTo(TestAttemp);

Test.hasOne(Theme);

Theme.hasMany(Question);
Question.belongsTo(Theme);

User.hasMany(Theme);

Test.belongsToMany(Question, { through: TestQuestion });
Question.belongsToMany(Test, { through: TestQuestion });

export {
  User,
  Test,
  Question,
  Answer,
  TestAttemp,
  UserAnswer,
  Theme,
  TestQuestion,
};
