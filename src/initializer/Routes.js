class Routes {
  static defineRoutes(app, bookingController, authController) {
    app.post("/api/bookings", (req, res) => {
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

    app.get("/api/bookings", (req, res) => {
      const { code, body } = bookingController.index(req);
      res.code(code).send(body);
    });
  }
}

export { Routes };