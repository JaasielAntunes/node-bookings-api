import { Booking } from "../bookings/booking.js";

class BookingService {
  constructor(repo) {
    this.repo = repo;
  }

  findAllBookings() {
    const bookings = this.repo.findAll();
    if (bookings.length === 0) {
      throw new Error("Não foi encontrada nenhuma reserva cadastrada!");
    }

    return bookings;
  }

  createBooking({ roomId, guestName, checkInDate, checkOutDate }) {
    const newBooking = new Booking(
      roomId,
      guestName,
      checkInDate,
      checkOutDate
    );

    const isRoomAvailable = this.repo.findAll().find((booking) => {
      return (
        booking.roomId === newBooking.roomId &&
        booking.checkInDate < newBooking.checkOutDate &&
        booking.checkOutDate > newBooking.checkInDate
      );
    });

    if (isRoomAvailable) {
      throw new Error("Quarto ocupado! Informe outro número de quarto.");
    }

    this.repo.create(newBooking);
    return newBooking;
  }
}

export { BookingService };
