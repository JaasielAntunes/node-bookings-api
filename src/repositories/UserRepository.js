import { db } from "../database/index.js";
import { User } from "../auth/User.js";

class UserRepository {
  constructor() {
    this.db = db;
  }

  async findByEmail(email) {
    const storedUser = await this.db.oneOrNone(
      "select * from Users where email = $1",
      email
    );

    return storedUser ? new User(storedUser) : null;
  }

  async findById(userId) {
    const user = await this.db.oneOrNone("select * from Users where id = $1", userId);
    return user ? new User(user) : null;
  }

  async findAll() {
    const users = await this.db.any("select * from Users");
    return users;
  }

  async save(user) {
    await this.db.none(
      "insert into Users (id, name, email, password) values ($1, $2, $3, $4)", [
        user.id,
        user.name,
        user.email,
        user.password
    ]);
  }

  async delete(userId) {
    await this.db.none("delete from Users where id = $1", [userId]);
  }
}

export { UserRepository };
