import { fastify } from "fastify";
import { BookingRepository } from "./bookings/BookingRepository.js";
import { BookingService } from "./bookings/BookingService.js";

const app = fastify({ logger: true });

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);

app.post("/api/bookings", (req, res) => {
  const { roomId, guestName, checkInDate, checkOutDate } = req.body;
  const newBooking = bookingService.createBooking({
    roomId,
    guestName,
    checkInDate,
    checkOutDate,
  });

  res.code(201).send({ message: "Reserva criada com sucesso!", newBooking });
});

app.get("/api/bookings", (req, res) => {
  const bookings = bookingService.findAllBookings();
  res.send(bookings);
});

export { app };
