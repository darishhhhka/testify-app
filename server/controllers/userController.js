import { ApiError } from "../error/ApiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/models.js";

const generateJwt = (id, login, role) => {
  return jwt.sign({ id, login, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { login, password, role } = req.body;
    if (!login || !password) {
      return next(ApiError.badRequest("Некоректный email или пароль"));
    }
    const candidate = await User.findOne({ where: { login } });

    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует"),
      );
    }

    const hasPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ login, password: hasPassword, role });
    const token = generateJwt(user.id, user.login, user.role);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });

    if (!user) {
      return next(ApiError.badRequest("Такого пользователя не существует"));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.badRequest("Указан неверный пароль"));
    }

    const token = generateJwt(user.id, user.login, user.role);
    return res.json({ token });
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.login, req.user.role);
    return res.json({ token });
  }
}

export const userController = new UserController();
