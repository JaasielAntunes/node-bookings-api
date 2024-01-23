import { fastify } from "fastify";
import { BookingRepository } from "./repositories/BookingRepository.js";
import { BookingService } from "./services/BookingService.js";
import { BookingController } from "./controllers/BookingController.js";
import { UserRepository } from "./repositories/UserRepository.js";
import { UserService } from "./services/UserService.js";
import { AuthController } from "./controllers/AuthController.js";

const app = fastify({ logger: true });

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService);
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

app.post("/api/bookings", (req, res) => {
  const { code, body } = bookingController.save(req);
  res.code(code).send(body);
});

app.post("/api/auth/register", (req, res) => {
  const { code, body } = authController.register(req);
  res.code(code).send(body);
})

app.get("/api/bookings", (req, res) => {
  const { code, body } = bookingController.index(req);
  res.code(code).send(body);
});

export { app };
