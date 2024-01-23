import { fastify } from "fastify";
import { BookingRepository } from "./repositories/BookingRepository.js";
import { BookingService } from "./services/BookingService.js";
import { BookingController } from "./controllers/BookingController.js";

const app = fastify({ logger: true });

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService);

app.post("/api/bookings", (req, res) => {
  const { code, body } = bookingController.save(req);
  res.code(code).send(body);
});

app.get("/api/bookings", (req, res) => {
  const { code, body } = bookingController.index(req);
  res.code(code).send(body);
});

export { app };
