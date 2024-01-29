class Routes {
  static defineRoutes(app, bookingController, authController, userService) {
    const authenticatedRoute = {
      preHandler: async (req, res) => {
        const token = req.headers.authorization?.replace(/^Bearer /, "");
        if (!token) res.code(401).send({ message: "Token ausente!" });

        const user = await userService.verifyToken(token);
        if (!user) res.code(404).send({ message: "Token inválido!" });
        req.user = user;
      },
    };

    app.post("/api/bookings", authenticatedRoute, async (req, res) => {
      const { code, body } = await bookingController.save(req);
      res.code(code).send(body);
    });

    app.get("/api/bookings", authenticatedRoute, async (req, res) => {
      const { code, body } = await bookingController.index(req);
      res.code(code).send(body);
    });

    app.post("/api/user/register", async (req, res) => {
      const { code, body } = await authController.register(req);
      res.code(code).send(body);
    });

    app.post("/api/user/login", async (req, res) => {
      const { code, body } = await authController.login(req);
      res.code(code).send(body);
    });

    app.get("/api/users", async (req, res) => {
      const { code, body } = await authController.listAllUsers(req);
      res.status(code).send(body);
    });

    app.delete("/api/user/delete/:userId", async (req, res) => {
      const { code, body } = await authController.delete(req);
      res.code(code).send(body);
    });
  }
}

export { Routes };
