class AuthController {
  constructor(service) {
    this.service = service;
  }

  register(req) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return {
        code: 400,
        body: { message: "Todos os campos devem ser informados!" },
      };

      try {
        const user = this.service.register(name, email, password);
        return {
          code: 201,
          body: { message: "Usário criado com sucesso!", user },
        };
      } catch (e) {
        return {
          code: 400,
          body: { message: e.message }
        };
      }
    }
  }

  login() {
    
  }
}
