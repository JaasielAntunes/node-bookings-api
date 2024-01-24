class AuthController {
  constructor(service) {
    this.service = service;
  }

  async register(req) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return {
        code: 400,
        body: { message: "Todos os campos são obrigatórios!" },
      };
    }

    try {
      const user = await this.service.register(name, email, password);
      return { code: 201, body: user };

    } catch (e) {
      return { code: 400, body: { message: e.message } };
    }
  }

  async listAllUsers() {
    const users = await this.service.findAllUsers();
    return { code: 200, body: { users } };
  }

  async login(req) {
    const { email, password } = req.body;

    if (!email || !password) {
      return {
        code: 400,
        body: { message: "Todos os campos são obrigatórios!" },
      };
    }

    try {
      const body = await this.service.login(email, password);
      return { code: 200, body };

    } catch (e) {
      return { code: 400, body: { message: e.message } };
    }
  }
}

export { AuthController };
