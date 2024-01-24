import { User } from "../auth/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  constructor(repo) {
    this.repo = repo;
  }

  async register(name, email, password) {
    const existingUser = await this.repo.findByEmail(email);
    if (existingUser) throw new Error("Este email já existe!");

    const user = new User({ name, email, password });
    user.password = bcrypt.hashSync(user.password, 10);
    await this.repo.save(user);
    return {
      code: 201,
      body: { message: "Usuário cadastrado com sucesso!", user },
    };
  }

  async findAllUsers() {
    const users = await this.repo.findAll();
    if (users.length === 0) {
      throw new Error("Nenhum usuário cadastrado no sistema!");
    }

    return users;
  }

  async login(email, password) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error("Email ou senha inválidos!");
    
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) throw new Error("Senha inválida!");

    const token = jwt.sign({ id: user.id, email: user.email }, "segredo-jwt", {
      expiresIn: "1d",
    });
    
    const { password: userPassword, ...userWithoutPassword } = user;
    return {
      code: 201,
      body: {
        message: "Usuário logado com sucesso!",
        user: userWithoutPassword,
        token,
      },
    };
  }

  async verifyToken(token) {
    const decodedToken = jwt.verify(token, "segredo-jwt");
    const user = await this.repo.findByEmail(decodedToken.email);
    return user;
  }
}

export { UserService };
