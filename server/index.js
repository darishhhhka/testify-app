import "dotenv/config";
import express from "express";
import { sequelize } from "./db.js";
import { User, Test, Question, Answer } from "./models/models.js";
import cors from "cors";
import { router } from "./routes/index.js";
import { errorHandler } from "./miadleware/ErrorHandlingMiddleware.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server strted on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
