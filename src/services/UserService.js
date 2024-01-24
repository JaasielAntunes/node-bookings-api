import { User } from "../auth/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  constructor(repo) {
    this.repo = repo;
  }

  register(name, email, password) {
    const existingUser = this.repo.findByEmail(email);
    if (existingUser) throw new Error("Este email já existe!");

    const user = new User({ name, email, password });
    user.password = bcrypt.hashSync(user.password, 10);
    this.repo.save(user);
    return user;
  }

  login(email, password) {
    const user = this.repo.findByEmail(email);
    if (!user) throw new Error("Email ou senha inválidos!");

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) throw new Error("Senha inválida!");

    const token = jwt.sign({ email: user.email }, "segredo-jwt", {
      expiresIn: "1d",
    });

    const { password: userPassword, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  verifyToken(token) {
    const decodedToken = jwt.verify(token, "segredo-jwt");
    const user = this.repo.findByEmail(decodedToken.email);
    return user;
  }
}

export { UserService };
