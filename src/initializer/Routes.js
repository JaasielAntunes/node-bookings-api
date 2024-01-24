class Routes {
  static defineRoutes(app, bookingController, authController, userService) {
    const authenticatedRoute = {
      preHandler: (req, res, done) => {
        const token = req.headers.authorization?.replace(/^Bearer /, "");
        if (!token) res.code(401).send({ message: "Token ausente!" });

        const user = userService.verifyToken(token);
        if (!user) res.code(404).send({ message: "Token inválido!" });
        req.user = user;
        done();
      },
    };

    app.post("/api/bookings", authenticatedRoute, (req, res) => {
      const { code, body } = bookingController.save(req);
      res.code(code).send(body);
    });
    app.post("/api/auth/register", (req, res) => {
      const { code, body } = authController.register(req);
      res.code(code).send(body);
    });

    app.post("/api/auth/login", (req, res) => {
      const { code, body } = authController.login(req);
      res.code(code).send(body);
    });

    app.get("/api/bookings", authenticatedRoute, (req, res) => {
      const { code, body } = bookingController.index(req);
      res.code(code).send(body);
    });
  }
}

export { Routes };
