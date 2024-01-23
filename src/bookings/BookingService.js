import { Booking } from "./booking.js";

class BookingService {
  constructor(repo) {
    this.repo = repo;
  }

  findAllBookings() {
    return this.repo.findAll();
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
