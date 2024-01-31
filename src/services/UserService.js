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

  async delete(userId) {
    const user = await this.repo.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    await this.repo.delete(userId);
    return {
      code: 200,
      body: { message: "Usuário excluído com sucesso!"},
    };
  }

  async findAllUsers() {
    const users = await this.repo.findAll();
    if (users.length === 0) {
      throw new Error("Nenhum usuário cadastrado no sistema!");
    }

    return users;
  }

  async update(userId, updatedData) {
    const { password, ...otherData } = updatedData;
  
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }
  
    try {
      const user = await this.repo.findById(userId);
      if (!user) {
        throw new Error("Usuário não encontrado!");
      }
  
      const updatedUser = await this.repo.update(userId, updatedData);
  
      if (updatedUser) {
        return {
          code: 200,
          body: { message: "Usuário atualizado com sucesso!", user: updatedUser },
        };
      }
  
    } catch (e) {
      return {
        code: 400,
        body: { message: "Falha ao atualizar o usuário: " + e.message },
      };
    }
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
      code: 202,
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
